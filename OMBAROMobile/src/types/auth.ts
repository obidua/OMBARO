```diff
--- a/OMBAROMobile/src/types/auth.ts
+++ b/OMBAROMobile/src/types/auth.ts
@@ -10,13 +10,30 @@
   isVerified?: boolean;
 }
 
+export type UserRole =
+  | 'customer'
+  | 'employee'
+  | 'vendor'
+  | 'admin'
+  | 'accounts_department'
+  | 'marketing_department'
+  | 'finance_department'
+  | 'legal_department'
+  | 'customer_care'
+  | 'staff_department'
+  | 'vendor_list'
+  | 'customer_data'
+  | 'fo_department'
+  | 'it_department'
+  | 'super_admin'
+  | 'ho_details'
+  | 'corporate_office'
+  | 'advocate'
+  | 'ca_cs'
+  | 'directors'
+  | 'hr_department';
+
 export interface AuthState {
-  user: Partial<User>;
-  userType?: 'customer' | 'employee' | 'vendor' | 'admin';
+  user: Partial<User>;
+  userType?: UserRole;
   isLoading: boolean;
   error: string | null;
   selectedEntity?: any;
   currentStep?: string;
 }
```