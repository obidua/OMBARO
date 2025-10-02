export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  description: string | null;
  unit: string;
  reorder_level: number;
  max_stock_level: number;
  current_stock: number;
  unit_price: number | null;
  status: 'active' | 'discontinued';
  created_at: string;
  updated_at: string;
}

export interface StockTransaction {
  id: string;
  item_id: string;
  transaction_type: 'purchase' | 'sale' | 'adjustment' | 'return' | 'damage' | 'transfer';
  quantity: number;
  unit_price: number | null;
  total_amount: number | null;
  reference_type: string | null;
  reference_id: string | null;
  warehouse_id: string | null;
  performed_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact_person: string | null;
  email: string | null;
  mobile: string | null;
  address: Record<string, any> | null;
  gst_number: string | null;
  pan_number: string | null;
  payment_terms: string | null;
  credit_limit: number;
  outstanding_balance: number;
  rating: number;
  status: 'active' | 'inactive' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface PurchaseOrder {
  id: string;
  po_number: string;
  supplier_id: string;
  order_date: string;
  expected_delivery_date: string | null;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  net_amount: number;
  status: 'draft' | 'submitted' | 'approved' | 'received' | 'cancelled';
  approved_by: string | null;
  approved_at: string | null;
  received_at: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: Record<string, any>;
  manager_id: string | null;
  capacity: number | null;
  current_utilization: number;
  is_primary: boolean;
  status: 'active' | 'inactive' | 'maintenance';
  created_at: string;
  updated_at: string;
}

export interface AssetTracking {
  id: string;
  asset_type: 'equipment' | 'vehicle' | 'furniture' | 'electronics' | 'other';
  asset_name: string;
  asset_code: string;
  purchase_date: string | null;
  purchase_cost: number | null;
  current_value: number | null;
  depreciation_rate: number | null;
  assigned_to: string | null;
  location: string | null;
  condition: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged' | null;
  warranty_expiry_date: string | null;
  last_maintenance_date: string | null;
  next_maintenance_date: string | null;
  status: 'active' | 'under_maintenance' | 'retired' | 'disposed';
  created_at: string;
  updated_at: string;
}

export interface InventoryFormData {
  name: string;
  sku: string;
  category?: string;
  description?: string;
  unit: string;
  reorder_level: number;
  max_stock_level: number;
  current_stock: number;
  unit_price?: number;
  status: 'active' | 'discontinued';
}

export interface StockTransactionFormData {
  item_id: string;
  transaction_type: 'purchase' | 'sale' | 'adjustment' | 'return' | 'damage' | 'transfer';
  quantity: number;
  unit_price?: number;
  warehouse_id?: string;
  notes?: string;
}

export interface SupplierFormData {
  name: string;
  contact_person?: string;
  email?: string;
  mobile?: string;
  address?: Record<string, any>;
  gst_number?: string;
  pan_number?: string;
  payment_terms?: string;
  credit_limit?: number;
  status: 'active' | 'inactive' | 'blocked';
}

export interface PurchaseOrderFormData {
  supplier_id: string;
  order_date: string;
  expected_delivery_date?: string;
  total_amount: number;
  tax_amount: number;
  discount_amount: number;
  notes?: string;
}

export interface WarehouseFormData {
  name: string;
  code: string;
  address: Record<string, any>;
  manager_id?: string;
  capacity?: number;
  is_primary: boolean;
  status: 'active' | 'inactive' | 'maintenance';
}

export interface AssetFormData {
  asset_type: 'equipment' | 'vehicle' | 'furniture' | 'electronics' | 'other';
  asset_name: string;
  asset_code: string;
  purchase_date?: string;
  purchase_cost?: number;
  current_value?: number;
  depreciation_rate?: number;
  assigned_to?: string;
  location?: string;
  condition?: 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
  warranty_expiry_date?: string;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  status: 'active' | 'under_maintenance' | 'retired' | 'disposed';
}

export type TransactionType = 'purchase' | 'sale' | 'adjustment' | 'return' | 'damage' | 'transfer';
export type InventoryStatus = 'active' | 'discontinued';
export type SupplierStatus = 'active' | 'inactive' | 'blocked';
export type PurchaseOrderStatus = 'draft' | 'submitted' | 'approved' | 'received' | 'cancelled';
export type WarehouseStatus = 'active' | 'inactive' | 'maintenance';
export type AssetType = 'equipment' | 'vehicle' | 'furniture' | 'electronics' | 'other';
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';
export type AssetStatus = 'active' | 'under_maintenance' | 'retired' | 'disposed';
