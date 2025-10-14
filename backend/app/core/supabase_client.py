from supabase import create_client, Client
from app.core.config import settings

supabase_admin: Client = None

def get_supabase_admin() -> Client:
    global supabase_admin
    if supabase_admin is None and settings.SUPABASE_URL and settings.SUPABASE_SERVICE_KEY:
        supabase_admin = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_SERVICE_KEY
        )
    return supabase_admin

def get_supabase_client(access_token: str = None) -> Client:
    if access_token:
        return create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_ANON_KEY,
            options={
                "headers": {
                    "Authorization": f"Bearer {access_token}"
                }
            }
        )
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
