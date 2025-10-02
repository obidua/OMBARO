import { supabase } from '../lib/supabase';

export interface SignUpData {
  mobile: string;
  password: string;
  name: string;
  role: string;
}

export interface SignInData {
  mobile: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  mobile: string;
  email?: string;
  role: string;
  profile_image?: string;
  status: string;
  created_at: string;
}

export class AuthService {
  async signUp(data: SignUpData) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      phone: data.mobile,
      password: data.password,
      options: {
        data: {
          name: data.name,
          role: data.role
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: authData.user.id,
          name: data.name,
          mobile: data.mobile,
          role: data.role,
          status: 'active'
        });

      if (profileError) throw profileError;
    }

    return authData;
  }

  async signIn(data: SignInData) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      phone: data.mobile,
      password: data.password
    });

    if (error) throw error;

    return authData;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  onAuthStateChange(callback: (user: any) => void) {
    return supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user || null);
    });
  }
}

export const authService = new AuthService();
