-- Add sample products to showcase the ecommerce functionality
-- First, let's add missing categories if they don't exist
DO $$
BEGIN
  -- Add missing categories safely
  INSERT INTO public.categories (name) VALUES ('Stationery')
    ON CONFLICT (name) DO NOTHING;
  INSERT INTO public.categories (name) VALUES ('Home & Kitchen')
    ON CONFLICT (name) DO NOTHING;  
  INSERT INTO public.categories (name) VALUES ('Beauty & Personal Care')
    ON CONFLICT (name) DO NOTHING;
  INSERT INTO public.categories (name) VALUES ('Sports & Fitness')
    ON CONFLICT (name) DO NOTHING;
EXCEPTION WHEN OTHERS THEN
  -- Continue if categories already exist
  NULL;
END $$;

-- Add sample products to demonstrate the ecommerce functionality
INSERT INTO public.products (name, description, price_usd, stock, image_url, category_id) VALUES
  ('Classic White T-Shirt', 'Comfortable cotton t-shirt perfect for everyday wear', 25.99, 50, '/src/assets/nike-air-max-270.jpg', 1),
  ('Elegant Summer Dress', 'Beautiful floral summer dress for special occasions', 79.99, 25, '/src/assets/adidas-ultraboost.jpg', 2),
  ('Wireless Bluetooth Headphones', 'High-quality wireless headphones with noise cancellation', 149.99, 15, '/src/assets/hero-banner.jpg', 3),
  ('Running Sneakers', 'Professional running shoes with advanced cushioning', 89.99, 30, '/src/assets/nike-air-max-270.jpg', 4),
  ('Leather Handbag', 'Premium leather handbag with multiple compartments', 199.99, 12, '/src/assets/adidas-ultraboost.jpg', 5)
ON CONFLICT DO NOTHING;