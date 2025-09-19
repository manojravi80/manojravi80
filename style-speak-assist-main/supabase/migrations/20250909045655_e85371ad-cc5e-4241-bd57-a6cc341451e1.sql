-- Drop all existing RLS policies on staff table and recreate properly
DROP POLICY IF EXISTS "Staff can signup" ON public.staff;
DROP POLICY IF EXISTS "Staff can view own profile" ON public.staff;
DROP POLICY IF EXISTS "Staff can update own profile" ON public.staff;

-- Create proper RLS policies for staff table
CREATE POLICY "Enable insert for authenticated users" ON public.staff
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable select for users based on user_id" ON public.staff
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" ON public.staff
FOR UPDATE 
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Add more products for Men's Clothing (category 1)
INSERT INTO public.products (name, description, price_usd, stock, category_id, image_url) VALUES
('Casual Polo Shirt', 'Comfortable cotton polo shirt perfect for casual occasions', 35.99, 40, 1, 'mens-polo.jpg'),
('Denim Jeans', 'Classic straight-fit denim jeans for everyday wear', 65.99, 30, 1, 'mens-jeans.jpg'),
('Formal Dress Shirt', 'Professional white dress shirt for business occasions', 45.99, 25, 1, 'mens-dress-shirt.jpg'),
('Leather Jacket', 'Premium leather jacket with modern design', 199.99, 15, 1, 'mens-leather-jacket.jpg');

-- Add more products for Women's Clothing (category 2)
INSERT INTO public.products (name, description, price_usd, stock, category_id, image_url) VALUES
('Casual Blouse', 'Elegant blouse perfect for work and casual wear', 42.99, 35, 2, 'womens-blouse.jpg'),
('High-Waist Jeans', 'Trendy high-waist jeans with perfect fit', 58.99, 28, 2, 'womens-jeans.jpg'),
('Cocktail Dress', 'Stunning cocktail dress for special events', 89.99, 20, 2, 'womens-cocktail-dress.jpg'),
('Cardigan Sweater', 'Cozy cardigan sweater for layering', 52.99, 32, 2, 'womens-cardigan.jpg');

-- Add more products for Electronics (category 3)
INSERT INTO public.products (name, description, price_usd, stock, category_id, image_url) VALUES
('Smartphone', 'Latest smartphone with advanced features', 699.99, 25, 3, 'smartphone.jpg'),
('Laptop Computer', 'High-performance laptop for work and gaming', 1299.99, 12, 3, 'laptop.jpg'),
('Tablet Device', 'Portable tablet perfect for entertainment and productivity', 399.99, 18, 3, 'tablet.jpg'),
('Smart Watch', 'Feature-rich smartwatch with health tracking', 299.99, 22, 3, 'smartwatch.jpg');

-- Add more products for Shoes (category 4)
INSERT INTO public.products (name, description, price_usd, stock, category_id, image_url) VALUES
('Casual Sneakers', 'Comfortable sneakers for everyday wear', 79.99, 35, 4, 'casual-sneakers.jpg'),
('Formal Dress Shoes', 'Elegant leather dress shoes for business', 129.99, 20, 4, 'dress-shoes.jpg'),
('High Heels', 'Stylish high heels for special occasions', 95.99, 25, 4, 'high-heels.jpg'),
('Boots', 'Durable boots perfect for outdoor activities', 149.99, 18, 4, 'boots.jpg');

-- Add more products for Accessories (category 5)
INSERT INTO public.products (name, description, price_usd, stock, category_id, image_url) VALUES
('Designer Sunglasses', 'Premium sunglasses with UV protection', 159.99, 30, 5, 'sunglasses.jpg'),
('Gold Watch', 'Luxury gold watch with precision movement', 599.99, 8, 5, 'gold-watch.jpg'),
('Silk Scarf', 'Elegant silk scarf with beautiful patterns', 89.99, 24, 5, 'silk-scarf.jpg'),
('Wallet', 'Premium leather wallet with multiple compartments', 79.99, 40, 5, 'leather-wallet.jpg');