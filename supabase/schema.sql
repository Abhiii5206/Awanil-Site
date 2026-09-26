-- ========================================================
-- AWANIL STORE DATABASE SCHEMA & POLICIES
-- Execute this SQL in your Supabase SQL Editor
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  original_price NUMERIC(10, 2) CHECK (original_price >= 0),
  category TEXT NOT NULL DEFAULT 'Bottles',
  image_url TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  rating NUMERIC(3, 2) DEFAULT 4.0 CHECK (rating >= 0 AND rating <= 5),
  flipkart_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES TABLE (Linked to Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AUTOMATIC UPDATED_AT TRIGGER FOR PRODUCTS
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER tr_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Customer'),
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Helper Function to check Admin Role safely
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PRODUCTS POLICIES
CREATE POLICY "Public users can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE
  USING (public.is_admin());

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE
  USING (public.is_admin());

-- PROFILES POLICIES
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- CONTACT MESSAGES POLICIES
CREATE POLICY "Anyone can send a contact message"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view contact messages"
  ON public.contact_messages FOR SELECT
  USING (public.is_admin());

-- ========================================================
-- DEMO DATA (8 BOTTLE PRODUCTS)
-- ========================================================

INSERT INTO public.products (name, description, price, original_price, category, image_url, stock, rating, flipkart_url, is_featured)
VALUES
(
  'AWANIL Stainless Steel Water Bottle',
  'Durable 1000ml double-wall stainless steel bottle designed for daily hydration. BPA-free and leak-proof.',
  699.00,
  999.00,
  'Bottles',
  'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
  25,
  4.5,
  'https://www.flipkart.com',
  true
),
(
  'AWANIL Insulated Vacuum Bottle',
  'Keeps beverages hot for 12 hours and cold for 24 hours. Premium matte powder coat finish with ergonomic handle.',
  899.00,
  1299.00,
  'Bottles',
  'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
  20,
  4.6,
  'https://www.flipkart.com',
  true
),
(
  'AWANIL Sports Water Bottle',
  'Lightweight impact-resistant bottle featuring a fast-flow spout and time-marker scale for workout tracking.',
  499.00,
  699.00,
  'Bottles',
  'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800',
  30,
  4.3,
  'https://www.flipkart.com',
  false
),
(
  'AWANIL Premium Thermal Bottle',
  'Luxury grade 316 stainless steel vacuum flask with built-in LED temperature filter cap.',
  1099.00,
  1499.00,
  'Bottles',
  'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&q=80&w=800',
  15,
  4.7,
  'https://www.flipkart.com',
  true
),
(
  'AWANIL Gym Shaker Bottle',
  '700ml shaker equipped with a surgical stainless steel wire whisk ball for smooth protein blends.',
  399.00,
  599.00,
  'Bottles',
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
  40,
  4.2,
  'https://www.flipkart.com',
  false
),
(
  'AWANIL Premium Travel Bottle',
  'Sleek multi-layer vacuum insulated flask with integrated tea strainer basket and silicone loop.',
  799.00,
  1099.00,
  'Bottles',
  'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=800',
  18,
  4.5,
  'https://www.flipkart.com',
  false
),
(
  'AWANIL Kids Water Bottle',
  'Child-safe 500ml spill-proof water bottle with soft silicone straw spout and shoulder strap.',
  349.00,
  499.00,
  'Bottles',
  'https://images.unsplash.com/photo-1570554886111-e80fcca6a029?auto=format&fit=crop&q=80&w=800',
  35,
  4.1,
  'https://www.flipkart.com',
  false
),
(
  'AWANIL Copper Water Bottle',
  '100% pure handcrafted jointless copper water bottle for holistic health benefits and natural alkaline drinking.',
  999.00,
  1399.00,
  'Bottles',
  'https://images.unsplash.com/photo-1610824352934-c10d87b700cc?auto=format&fit=crop&q=80&w=800',
  12,
  4.6,
  'https://www.flipkart.com',
  true
);