-- seeds.sql --

-- populate the products table --

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('Halloween Socks', 'Footwear', 7.99, 50),
('Skull and Bones Chandelier', 'Lighting', 289.98, 7),
('Book of Spells and Potions (Trade Paperback)', 'Reference', 13.98, 13),
('Shrunken Head', 'Novelties', 78.98, 2),
("Authentic Monkey's Paw", 'Novelties', 119.48, 1),
('Budget Buster Cauldron', 'Kitchen', 19.98, 15),
('Oija Board of Unknown Provenance', 'Games', 112.00, 1),
('Hockey Mask', 'Work Wear', 17.99, 9),
('Bag of Assorted Hooks', 'Tools', 12.98, 32),
('Baphomet Poster', 'Home Decor', 6.98, 19),
('Iron Maiden Filing Cabinet', 'Home/Office', 68.98, 6);