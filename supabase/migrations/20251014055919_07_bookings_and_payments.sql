/*
  # Bookings and Payments Tables
  
  Creates bookings, booking items, status history, notes, cancellations, reschedules,
  payment methods, payments, refunds, wallet transactions, commission records
*/

-- Bookings Tables
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number text UNIQUE NOT NULL,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  booking_type text NOT NULL CHECK (booking_type IN ('home_service', 'spa_visit', 'hotel_service')),
  service_location jsonb NOT NULL,
  booking_date date NOT NULL,
  booking_time time NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  discount_amount numeric(10,2) DEFAULT 0,
  tax_amount numeric(10,2) DEFAULT 0,
  service_charge numeric(10,2) DEFAULT 0,
  final_amount numeric(10,2) NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled', 'rescheduled'
  )),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
  special_instructions text,
  cancellation_reason text,
  cancelled_by uuid REFERENCES auth.users(id),
  cancelled_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_vendor ON bookings(vendor_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_bookings_date ON bookings(booking_date, booking_time);
CREATE INDEX idx_bookings_number ON bookings(booking_number);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Customers can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Vendors can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS booking_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  service_name text NOT NULL,
  service_duration integer NOT NULL,
  service_price numeric(10,2) NOT NULL,
  quantity integer DEFAULT 1,
  addon_services jsonb DEFAULT '[]',
  subtotal numeric(10,2) NOT NULL,
  therapist_id uuid REFERENCES therapists(id),
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_booking_items_booking ON booking_items(booking_id);
CREATE INDEX idx_booking_items_service ON booking_items(service_id);
CREATE INDEX idx_booking_items_therapist ON booking_items(therapist_id);

ALTER TABLE booking_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view booking items of their bookings"
  ON booking_items FOR SELECT
  TO authenticated
  USING (
    booking_id IN (
      SELECT id FROM bookings
      WHERE customer_id = auth.uid()
      OR vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid())
    )
  );

CREATE TABLE IF NOT EXISTS booking_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  reason text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_booking_status_history_booking ON booking_status_history(booking_id);
CREATE INDEX idx_booking_status_history_created ON booking_status_history(created_at DESC);

CREATE TABLE IF NOT EXISTS booking_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  note_type text CHECK (note_type IN ('customer', 'vendor', 'therapist', 'internal', 'system')),
  note text NOT NULL,
  created_by uuid REFERENCES auth.users(id),
  is_internal boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_booking_notes_booking ON booking_notes(booking_id);

CREATE TABLE IF NOT EXISTS booking_cancellations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  cancelled_by uuid NOT NULL REFERENCES auth.users(id),
  cancelled_by_role text NOT NULL CHECK (cancelled_by_role IN ('customer', 'vendor', 'therapist', 'admin')),
  cancellation_reason text NOT NULL,
  refund_amount numeric(10,2) DEFAULT 0,
  refund_status text DEFAULT 'pending' CHECK (refund_status IN ('pending', 'processing', 'completed', 'failed')),
  cancellation_charge numeric(10,2) DEFAULT 0,
  cancelled_at timestamptz DEFAULT now()
);

CREATE INDEX idx_booking_cancellations_booking ON booking_cancellations(booking_id);
CREATE INDEX idx_booking_cancellations_cancelled_by ON booking_cancellations(cancelled_by);

CREATE TABLE IF NOT EXISTS booking_reschedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  old_date date NOT NULL,
  old_time time NOT NULL,
  new_date date NOT NULL,
  new_time time NOT NULL,
  requested_by uuid NOT NULL REFERENCES auth.users(id),
  requested_by_role text NOT NULL CHECK (requested_by_role IN ('customer', 'vendor', 'therapist', 'admin')),
  reason text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  approved_by uuid REFERENCES auth.users(id),
  approved_at timestamptz,
  reschedule_charge numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_booking_reschedules_booking ON booking_reschedules(booking_id);
CREATE INDEX idx_booking_reschedules_requested_by ON booking_reschedules(requested_by);

-- Payments Tables
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  method_type text NOT NULL CHECK (method_type IN ('card', 'upi', 'wallet', 'netbanking')),
  is_primary boolean DEFAULT false,
  card_last4 text,
  card_brand text,
  upi_id text,
  wallet_provider text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_payment_methods_customer ON payment_methods(customer_id);

ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can manage own payment methods"
  ON payment_methods FOR ALL
  TO authenticated
  USING (customer_id = auth.uid())
  WITH CHECK (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_id text UNIQUE NOT NULL,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  amount numeric(10,2) NOT NULL,
  tax_amount numeric(10,2) DEFAULT 0,
  discount_amount numeric(10,2) DEFAULT 0,
  convenience_fee numeric(10,2) DEFAULT 0,
  total_amount numeric(10,2) NOT NULL,
  payment_method text NOT NULL CHECK (payment_method IN (
    'credit_card', 'debit_card', 'upi', 'net_banking', 'wallet', 'cash', 'pay_later'
  )),
  payment_gateway text,
  gateway_transaction_id text,
  gateway_response jsonb,
  status text DEFAULT 'pending' CHECK (status IN (
    'pending', 'processing', 'success', 'failed', 'refunded', 'partially_refunded'
  )),
  payment_date timestamptz,
  refund_amount numeric(10,2) DEFAULT 0,
  refund_date timestamptz,
  refund_reason text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_vendor ON payments(vendor_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_transaction ON payments(transaction_id);
CREATE INDEX idx_payments_date ON payments(payment_date DESC);

ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE POLICY "Vendors can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE TABLE IF NOT EXISTS refunds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id uuid NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  refund_amount numeric(10,2) NOT NULL,
  refund_reason text NOT NULL,
  refund_type text NOT NULL CHECK (refund_type IN ('full', 'partial', 'cancellation', 'adjustment')),
  refund_method text,
  gateway_refund_id text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  processed_by uuid REFERENCES auth.users(id),
  processed_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_refunds_payment ON refunds(payment_id);
CREATE INDEX idx_refunds_booking ON refunds(booking_id);
CREATE INDEX idx_refunds_customer ON refunds(customer_id);
CREATE INDEX idx_refunds_status ON refunds(status);

ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own refunds"
  ON refunds FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS wallet_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  transaction_type text NOT NULL CHECK (transaction_type IN ('credit', 'debit', 'refund', 'bonus')),
  amount numeric(10,2) NOT NULL,
  balance_after numeric(10,2) NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  payment_id uuid REFERENCES payments(id),
  description text,
  reference_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_wallet_transactions_customer ON wallet_transactions(customer_id);
CREATE INDEX idx_wallet_transactions_created ON wallet_transactions(created_at DESC);

ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Customers can view own wallet transactions"
  ON wallet_transactions FOR SELECT
  TO authenticated
  USING (customer_id = auth.uid());

CREATE TABLE IF NOT EXISTS commission_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
  vendor_id uuid NOT NULL REFERENCES vendors(id) ON DELETE RESTRICT,
  therapist_id uuid REFERENCES therapists(id) ON DELETE SET NULL,
  booking_amount numeric(10,2) NOT NULL,
  commission_rate numeric(5,2) NOT NULL,
  commission_amount numeric(10,2) NOT NULL,
  therapist_earning numeric(10,2) DEFAULT 0,
  platform_earning numeric(10,2) NOT NULL,
  tds_amount numeric(10,2) DEFAULT 0,
  gst_amount numeric(10,2) DEFAULT 0,
  settlement_status text DEFAULT 'pending' CHECK (settlement_status IN ('pending', 'processing', 'settled', 'hold')),
  settlement_date timestamptz,
  period_month date,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_commission_records_booking ON commission_records(booking_id);
CREATE INDEX idx_commission_records_vendor ON commission_records(vendor_id);
CREATE INDEX idx_commission_records_therapist ON commission_records(therapist_id);
CREATE INDEX idx_commission_records_period ON commission_records(period_month);
CREATE INDEX idx_commission_records_settlement ON commission_records(settlement_status);

ALTER TABLE commission_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vendors can view own commission records"
  ON commission_records FOR SELECT
  TO authenticated
  USING (vendor_id IN (SELECT id FROM vendors WHERE user_id = auth.uid()));

CREATE POLICY "Therapists can view own commission records"
  ON commission_records FOR SELECT
  TO authenticated
  USING (therapist_id IN (SELECT id FROM therapists WHERE user_id = auth.uid()));