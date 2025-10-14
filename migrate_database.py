#!/usr/bin/env python3
"""
Database Migration Script
Migrates all tables and data from old Supabase database to new database
"""

import os
import sys
import psycopg2
from psycopg2 import sql
from psycopg2.extras import RealDictCursor
import time

# Old database credentials
OLD_DB = "postgresql://postgres.vspkiuissuuesjsnnpqr:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres"

# New database credentials
NEW_DB = "postgresql://postgres:[YOUR-PASSWORD]@db.yjdjujhtpuzyhvicivyi.supabase.co:5432/postgres"

print("="*80)
print("OMBARO Database Migration Script")
print("="*80)
print()

print("Step 1: Connecting to old database...")
try:
    old_conn = psycopg2.connect(OLD_DB)
    old_cur = old_conn.cursor(cursor_factory=RealDictCursor)
    print("✓ Connected to old database")
except Exception as e:
    print(f"✗ Error connecting to old database: {e}")
    sys.exit(1)

print("\nStep 2: Connecting to new database...")
try:
    new_conn = psycopg2.connect(NEW_DB)
    new_cur = new_conn.cursor()
    print("✓ Connected to new database")
except Exception as e:
    print(f"✗ Error connecting to new database: {e}")
    sys.exit(1)

print("\nStep 3: Getting list of tables from old database...")
old_cur.execute("""
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    AND table_name NOT IN ('spatial_ref_sys', 'geography_columns', 'geometry_columns')
    ORDER BY table_name
""")
tables = [row['table_name'] for row in old_cur.fetchall()]
print(f"✓ Found {len(tables)} tables to migrate")
print(f"  Tables: {', '.join(tables)}")

print("\nStep 4: Applying schema migrations to new database...")
migration_file = "/tmp/cc-agent/58537508/project/supabase/migrations/20250115_clean_production_schema.sql"
if os.path.exists(migration_file):
    with open(migration_file, 'r') as f:
        migration_sql = f.read()
    try:
        new_cur.execute(migration_sql)
        new_conn.commit()
        print("✓ Schema migrations applied successfully")
    except Exception as e:
        print(f"✗ Error applying migrations: {e}")
        new_conn.rollback()
        print("  Continuing anyway as tables may already exist...")
else:
    print(f"✗ Migration file not found: {migration_file}")

print("\nStep 5: Verifying new database schema...")
new_cur.execute("""
    SELECT COUNT(*) as count
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
""")
new_table_count = new_cur.fetchone()[0]
print(f"✓ New database has {new_table_count} tables")

if new_table_count == 0:
    print("\n⚠️  WARNING: New database has no tables!")
    print("   Please apply migrations manually via Supabase Dashboard first.")
    print("   Then run this script again.")
    sys.exit(1)

print("\nStep 6: Migrating data...")
print("-"*80)

migrated_count = 0
skipped_count = 0
error_count = 0

# Order tables by dependencies (approximate)
table_order = [
    'countries', 'states', 'cities', 'zones', 'pincode_master',
    'system_settings', 'feature_flags', 'departments', 'roles', 'permissions',
    'role_permissions', 'service_categories', 'services', 'addon_services',
    'service_packages'
]

# Add remaining tables
for table in tables:
    if table not in table_order:
        table_order.append(table)

for table_name in table_order:
    if table_name not in tables:
        continue

    try:
        print(f"\nMigrating '{table_name}'...")

        # Get row count from old database
        old_cur.execute(f"SELECT COUNT(*) as count FROM {table_name}")
        old_count = old_cur.fetchone()['count']

        if old_count == 0:
            print(f"  ⊘ No data in table (skipped)")
            skipped_count += 1
            continue

        # Get data from old database
        old_cur.execute(f"SELECT * FROM {table_name}")
        rows = old_cur.fetchall()

        if not rows:
            print(f"  ⊘ No data in table (skipped)")
            skipped_count += 1
            continue

        # Get column names
        columns = rows[0].keys()

        # Build INSERT query
        placeholders = ', '.join(['%s'] * len(columns))
        columns_str = ', '.join([f'"{col}"' for col in columns])
        insert_query = f'INSERT INTO {table_name} ({columns_str}) VALUES ({placeholders}) ON CONFLICT DO NOTHING'

        # Insert data in batches
        batch_size = 100
        inserted = 0

        for i in range(0, len(rows), batch_size):
            batch = rows[i:i + batch_size]
            values = [tuple(row[col] for col in columns) for row in batch]

            try:
                new_cur.executemany(insert_query, values)
                new_conn.commit()
                inserted += len(batch)
            except Exception as e:
                new_conn.rollback()
                print(f"  ⚠ Error inserting batch: {e}")
                # Try inserting one by one
                for row in batch:
                    try:
                        values = tuple(row[col] for col in columns)
                        new_cur.execute(insert_query, values)
                        new_conn.commit()
                        inserted += 1
                    except Exception as e2:
                        new_conn.rollback()
                        pass  # Skip conflicting rows

        print(f"  ✓ Migrated {inserted}/{old_count} rows")
        migrated_count += 1

    except Exception as e:
        print(f"  ✗ Error: {e}")
        error_count += 1
        continue

print("\n" + "="*80)
print("Migration Summary")
print("="*80)
print(f"Tables migrated successfully: {migrated_count}")
print(f"Tables skipped (no data):     {skipped_count}")
print(f"Tables with errors:           {error_count}")
print()

# Verify final row counts
print("\nStep 7: Verifying migration...")
print("-"*80)

for table_name in tables:
    try:
        old_cur.execute(f"SELECT COUNT(*) as count FROM {table_name}")
        old_count = old_cur.fetchone()['count']

        new_cur.execute(f"SELECT COUNT(*) as count FROM {table_name}")
        new_count = new_cur.fetchone()[0]

        if old_count > 0:
            percentage = (new_count / old_count) * 100 if old_count > 0 else 0
            status = "✓" if new_count >= old_count else "⚠"
            print(f"{status} {table_name:30s} Old: {old_count:5d} → New: {new_count:5d} ({percentage:.1f}%)")
    except Exception as e:
        print(f"✗ {table_name:30s} Error: {e}")

print("\n" + "="*80)
print("Migration Complete!")
print("="*80)
print()
print("Next steps:")
print("1. Update .env file with new database credentials")
print("2. Test the application with the new database")
print("3. Verify all functionality works correctly")
print()

# Close connections
old_cur.close()
old_conn.close()
new_cur.close()
new_conn.close()
