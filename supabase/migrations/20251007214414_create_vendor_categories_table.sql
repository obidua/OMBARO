/*
  # Create Vendor Categories Table
  
  Creates the vendor_categories table with predefined business categories for vendor onboarding.
  
  1. New Tables
    - `vendor_categories`: Stores vendor business category options
      - `id` (uuid, primary key)
      - `category_code` (text, unique): Short code for the category
      - `category_name` (text): Display name for the category
      - `description` (text): Description of the category
      - `icon_name` (text): Icon identifier for UI display
      - `is_active` (boolean): Whether category is currently available
      - `display_order` (integer): Order for displaying categories
      - `created_at` (timestamptz): Record creation timestamp
  
  2. Seed Data
    - 8 predefined vendor categories with icons and descriptions
  
  3. Security
    - Enable RLS on vendor_categories table
    - Allow anonymous and authenticated users to view active categories
*/

-- Create vendor_categories table
CREATE TABLE IF NOT EXISTS vendor_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_code text UNIQUE NOT NULL,
  category_name text NOT NULL,
  description text,
  icon_name text,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Insert predefined vendor categories
INSERT INTO vendor_categories (category_code, category_name, description, icon_name, display_order) VALUES
('spa', 'Spa & Massage', 'Full-service spa with massage therapy', 'Sparkles', 1),
('salon', 'Beauty Salon', 'Hair, makeup, and beauty services', 'Scissors', 2),
('wellness', 'Wellness Center', 'Holistic wellness and therapy center', 'Heart', 3),
('home_service', 'Home Service', 'Mobile spa and salon services', 'Home', 4),
('hotel_spa', 'Hotel Spa', 'Luxury hotel spa facilities', 'Building', 5),
('gym_fitness', 'Gym & Fitness', 'Fitness center with wellness services', 'Dumbbell', 6),
('yoga_meditation', 'Yoga & Meditation', 'Yoga studio and meditation center', 'Flame', 7),
('ayurveda', 'Ayurveda Center', 'Traditional Ayurvedic treatments', 'Leaf', 8)
ON CONFLICT (category_code) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE vendor_categories ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view active categories
CREATE POLICY "Anyone can view active categories"
  ON vendor_categories FOR SELECT
  TO anon, authenticated
  USING (is_active = true);