-- Add more products for Men's Clothing (category_id: 1)
INSERT INTO public.products (name, description, price_usd, category_id, stock, image_url) VALUES
('Business Suit', 'Professional two-piece suit for formal occasions', 299.99, 1, 12, 'mens-dress-shirt.jpg'),
('Casual Hoodie', 'Comfortable cotton hoodie for casual wear', 49.99, 1, 45, 'white-tshirt.jpg'),
('Cargo Shorts', 'Practical cargo shorts with multiple pockets', 39.99, 1, 38, 'mens-jeans.jpg'),
('Winter Coat', 'Warm winter coat for cold weather', 149.99, 1, 20, 'mens-leather-jacket.jpg'),
('Track Pants', 'Comfortable athletic track pants', 34.99, 1, 42, 'mens-jeans.jpg'),
('Flannel Shirt', 'Soft flannel shirt perfect for autumn', 55.99, 1, 28, 'mens-dress-shirt.jpg'),
('Swim Shorts', 'Quick-dry swim shorts for beach days', 29.99, 1, 35, 'mens-jeans.jpg'),

-- Add more products for Women's Clothing (category_id: 2) 
('Maxi Dress', 'Flowing maxi dress perfect for summer events', 68.99, 2, 22, 'summer-dress.jpg'),
('Pencil Skirt', 'Professional pencil skirt for office wear', 45.99, 2, 30, 'womens-blouse.jpg'),
('Yoga Leggings', 'Stretchy leggings perfect for yoga and workouts', 38.99, 2, 50, 'womens-jeans.jpg'),
('Silk Scarf Blouse', 'Elegant blouse with silk scarf detail', 72.99, 2, 18, 'womens-blouse.jpg'),
('Denim Jacket', 'Classic denim jacket for casual styling', 59.99, 2, 26, 'womens-cardigan.jpg'),
('Evening Gown', 'Formal evening gown for special occasions', 189.99, 2, 8, 'womens-cocktail-dress.jpg'),
('Casual Jumpsuit', 'Comfortable one-piece jumpsuit', 64.99, 2, 24, 'summer-dress.jpg'),

-- Add more products for Electronics (category_id: 3)
INSERT INTO public.products (name, description, price_usd, category_id, stock, image_url) VALUES
('Gaming Laptop', 'High-performance gaming laptop with RTX graphics', 1299.99, 3, 8, 'laptop.jpg'),
('Bluetooth Speaker', 'Portable wireless speaker with premium sound', 89.99, 3, 45, 'wireless-headphones.jpg'),
('4K Monitor', 'Ultra HD 27-inch monitor for work and gaming', 349.99, 3, 15, 'tablet.jpg'),
('Mechanical Keyboard', 'RGB backlit mechanical gaming keyboard', 129.99, 3, 32, 'laptop.jpg'),
('Webcam HD', 'High-definition webcam for video calls', 79.99, 3, 28, 'smartphone.jpg'),
('Power Bank', 'High-capacity portable charger 20000mAh', 45.99, 3, 60, 'smartphone.jpg'),
('Smart TV', '55-inch 4K Smart TV with streaming apps', 599.99, 3, 12, 'tablet.jpg'),
('Gaming Mouse', 'Precision gaming mouse with customizable buttons', 69.99, 3, 40, 'laptop.jpg'),
('Tablet Pro', 'Professional tablet with stylus support', 449.99, 3, 18, 'tablet.jpg'),
('Action Camera', 'Waterproof 4K action camera for adventures', 199.99, 3, 22, 'smartphone.jpg'),

-- Add more products for Shoes (category_id: 4)
('Running Sneakers', 'Lightweight running shoes with cushioned sole', 89.99, 4, 35, 'running-shoes.jpg'),
('Leather Boots', 'Premium leather boots for outdoor activities', 149.99, 4, 20, 'boots.jpg'),
('High-Top Sneakers', 'Classic canvas high-top sneakers', 65.99, 4, 42, 'casual-sneakers.jpg'),
('Ballet Flats', 'Comfortable ballet flats for everyday wear', 55.99, 4, 38, 'high-heels.jpg'),
('Oxford Shoes', 'Classic oxford shoes for formal occasions', 119.99, 4, 25, 'dress-shoes.jpg'),
('Hiking Boots', 'Waterproof hiking boots for trail adventures', 179.99, 4, 18, 'boots.jpg'),
('Slip-On Sneakers', 'Easy slip-on sneakers for casual comfort', 49.99, 4, 45, 'casual-sneakers.jpg'),
('Platform Heels', 'Stylish platform heels for special events', 89.99, 4, 15, 'high-heels.jpg'),
('Athletic Trainers', 'Cross-training shoes for gym workouts', 99.99, 4, 30, 'running-shoes.jpg'),
('Loafers', 'Classic leather loafers for business casual', 95.99, 4, 28, 'dress-shoes.jpg'),

-- Add more products for Accessories (category_id: 5)
('Leather Backpack', 'Premium leather backpack for work and travel', 129.99, 5, 22, 'leather-handbag.jpg'),
('Designer Sunglasses', 'UV protection designer sunglasses', 149.99, 5, 35, 'sunglasses.jpg'),
('Fitness Tracker', 'Advanced fitness tracker with heart rate monitor', 199.99, 5, 28, 'smartwatch.jpg'),
('Crossbody Bag', 'Stylish crossbody bag for everyday use', 79.99, 5, 40, 'leather-handbag.jpg'),
('Baseball Cap', 'Adjustable cotton baseball cap', 24.99, 5, 60, 'sunglasses.jpg'),
('Luxury Watch', 'Premium automatic watch with leather strap', 599.99, 5, 8, 'gold-watch.jpg'),
('Phone Case', 'Protective phone case with card slots', 29.99, 5, 75, 'leather-wallet.jpg'),
('Travel Duffel', 'Large capacity travel duffel bag', 89.99, 5, 18, 'leather-handbag.jpg'),
('Pearl Necklace', 'Elegant pearl necklace for formal occasions', 159.99, 5, 12, 'silk-scarf.jpg'),
('Wireless Earbuds', 'True wireless earbuds with noise cancellation', 179.99, 5, 32, 'wireless-headphones.jpg');