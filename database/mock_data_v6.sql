-- insert-mock-data.sql
-- Mock data for wsk_restaurant_schema

-- insert-mock-data.sql
-- Mock data for wsk_restaurant_schema

-- -----------------------
-- Table `users`
-- -----------------------
INSERT INTO `users` (username, `password`, `role`, `name`, `email`, `image`, message) VALUES
('admin','$2b$10$SwiO2GYHWj1WzebSL3taJ.dXiXs5rN9mWz6Tk6PgGnhUopGk8Dhv6', 'admin', 'name', 'admin@email.fi', 'placeholder.jpg','mock data from database'),
('username','$2b$10$sJ//y1vPPH21XJCGpKDKvuDRx.LFM9b6R02DetaPmzRZQzKUw07y.', 'user', 'Bob Smith', 'bob@example.com', 'placeholder.jpg','mock data from database'),
('username3','pass789', 'user', 'Charlie Brown', 'charlie@example.com', NULL,'mock data from database'),
('username4','pass101', 'user', 'David Lee', 'david@example.com', 'david.jpg','mock data from database'),
('username5','pass102', 'user', 'Eva Green', 'eva@example.com', 'eva.jpg','mock data from database'),
('username6','pass103', 'admin', 'Frank White', 'frank@example.com', NULL,'mock data from database'),
('username7','pass104', 'user', 'Grace Kim', 'grace@example.com', 'grace.jpg','mock data from database'),
('username8','pass105', 'user', 'Henry Tan', 'henry@example.com', NULL,'mock data from database'),
('username9','pass106', 'user', 'Ivy Chen', 'ivy@example.com', 'ivy.jpg','mock data from database'),
('username10','pass107', 'user', 'Jack Liu', 'jack@example.com', NULL,'mock data from database');

-- -----------------------
-- Table `locations`
-- -----------------------
INSERT INTO `locations` (`id`,`name`, `address`, `email`, `phone`, `table_count`, `message`) VALUES
(1, 'Restauranto', '123 Main St, Helsinki', 'helsinki@example.com', '+358401234567', 10, 'mock data from database'),
(2, 'Restauranto', '456 Market St, Espoo', 'espoo@example.com', '+358402345678', 8, 'mock data from database'),
(3, 'Restauranto', '789 Riverside Rd, Vantaa', 'vantaa@example.com', '+358403456789', 12, 'mock data from database'),
(4, 'Restauranto', '321 Lakeview St, Turku', 'turku@example.com', '+358404567890', 15, 'mock data from database');

-- Table `meals`
-- -----------------------
INSERT INTO `meals` (`name_fi`, `name_en`, `description_fi`, `description_en`, `cost`, `type`, `image`, `message`) VALUES
('Lihapulla', 'Meatballs', 'Perinteiset lihapullat', 'Classic meatballs', 12.5, 'G, M, E', 'meatballs.jpg','mock data from database'),
('Lohta', 'Salmon', 'Paistettua lohta perunoilla', 'Fried salmon with potatoes', 15.0, 'F, L', 'salmon.jpg','mock data from database'),
('Kasviskeitto', 'Vegetable Soup', 'Terveellinen kasviskeitto', 'Healthy vegetable soup', 8.0, 'CE', 'veg_soup.jpg','mock data from database'),
('Kana Curry', 'Chicken Curry', 'Mausteinen kanacurry riisillä', 'Spicy chicken curry with rice', 13.5, 'M, S', 'chicken_curry.jpg','mock data from database'),
('Pasta Bolognese', 'Pasta Bolognese', 'Italialainen bolognese kastike pastan kanssa', 'Italian bolognese sauce with pasta', 11.0, 'G, M, CE', 'pasta_bolognese.jpg','mock data from database'),
('Pizza Margherita', 'Pizza Margherita', 'Perinteinen Margherita pizza', 'Classic Margherita pizza', 10.0, 'G, M', 'pizza_margherita.jpg','mock data from database'),
('Pizza Pepperoni', 'Pizza Pepperoni', 'Pepperonilla täytetty pizza', 'Pepperoni pizza', 12.0, 'G, M, S', 'pizza_pepperoni.jpg','mock data from database'),
('Caesar Salaatti', 'Caesar Salad', 'Salaatti kanalla ja parmesaanilla', 'Salad with chicken and parmesan', 9.5, 'F, M, E, G, MU', 'caesar_salad.jpg','mock data from database'),
('Lasagne', 'Lasagna', 'Italialainen lasagne', 'Italian lasagna', 14.0, 'G, M, CE', 'lasagna.jpg','mock data from database'),
('Kanasalaatti', 'Chicken Salad', 'Kevyt kanasalaatti', 'Light chicken salad', 10.5, 'E, MU', 'chicken_salad.jpg','mock data from database'),
('Tomaattikeitto', 'Tomato Soup', 'Terveellinen tomaattikeitto', 'Healthy tomato soup', 7.5, NULL, 'tomato_soup.jpg','mock data from database'),
('Hampurilainen', 'Burger', 'Juustohampurilainen', 'Cheeseburger', 11.5, 'G, M, E, S, SU', 'burger.jpg','mock data from database'),
('Fish & Chips', 'Fish & Chips', 'Paistettua kalaa ja ranskalaisia', 'Fried fish and chips', 13.0, 'F, G, E', 'fish_chips.jpg','mock data from database'),
('Sushi Set', 'Sushi Set', 'Assortment of sushi', 'Assortment of sushi', 18.0, 'F, S, SE, C', 'sushi_set.jpg','mock data from database'),
('Pannukakku', 'Pancake', 'Makea pannukakku', 'Sweet pancake', 6.0, 'G, M, E', 'pancake.jpg','mock data from database'),
('Ratatouille', 'Ratatouille', 'Kasvisruoka ranskalaisittain', 'French-style vegetable dish', 12.0, NULL, 'ratatouille.jpg','mock data from database'),
('Quiche', 'Quiche', 'Perinteinen quiche', 'Traditional quiche', 9.0, 'G, M, E', 'quiche.jpg','mock data from database'),
('Risotto', 'Risotto', 'Sienirisotto', 'Mushroom risotto', 14.0, NULL, 'risotto.jpg','mock data from database'),
('Tortilla', 'Tortilla', 'Täytetty tortilla', 'Stuffed tortilla', 10.0, 'G', 'tortilla.jpg','mock data from database'),
('Porkkana-inkiväärikeitto', 'Carrot Ginger Soup', 'Mausteinen porkkana-inkiväärikeitto', 'Spicy carrot ginger soup', 8.0, NULL, 'carrot_ginger_soup.jpg','mock data from database'),
('Grillattu Lohi', 'Grilled Salmon', 'Grillattua lohta ja vihanneksia', 'Grilled salmon with vegetables', 16.0, 'F, M', 'grilled_salmon.jpg','mock data from database'),
('Beef Steak', 'Beef Steak', 'Paistettua pihviä', 'Grilled beef steak', 20.0, 'M, SU', 'beef_steak.jpg','mock data from database'),
('Veggie Burger', 'Veggie Burger', 'Kasvisburger', 'Vegetarian burger', 11.0, 'G, M, S, E, SE', 'veggie_burger.jpg','mock data from database');

-- -----------------------
-- Table `orders`
-- -----------------------
INSERT INTO `orders` (`user`, `cost`, `timestamp`, `message`) VALUES
(1, 25.0, '2025-12-01 12:30:00', 'mock data from database'),
(2, 15.0, '2025-12-02 13:00:00', 'mock data from database'),
(3, 32.0, '2025-12-03 18:45:00', 'mock data from database'),
(4, 45.5, '2025-12-04 19:00:00', 'mock data from database'),
(5, 22.0, '2025-12-05 12:15:00', 'mock data from database'),
(6, 50.0, '2025-12-05 18:00:00', 'mock data from database');


-- -----------------------
-- Table `order_reservations`
-- -----------------------
INSERT INTO `order_reservations` (`order`, `reservation`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7);


-- -----------------------
-- Table `order_gift_cards`
-- -----------------------
INSERT INTO `order_gift_cards` (`order`, `gift_card`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(1, 7);


-- -----------------------
-- Table `gift_cards`
-- -----------------------
INSERT INTO `gift_cards` (`value`,`expiration_date`, `password`, message, gift_cards.`order`, `user`) VALUES
(50.0,'2026-01-01', 'GC123','mock data from database', 1,1),
(100.0,'2026-06-30', 'GC456','mock data from database', 1,1),
(75.0,'2026-03-01', 'GC789','mock data from database', 1,1),
(30.0,'2026-05-15', 'GC101','mock data from database', 1,1),
(60.0,'2026-07-20', 'GC102','mock data from database', 1,1),
(120.0,'2026-08-31', 'GC103','mock data from database', 1,1),
(25.0,'2026-10-10', 'GC104','mock data from database', 1,1);

-- -----------------------
-- Table `reservations`
-- -----------------------
INSERT INTO `reservations` (user, `order`, date , table_customer_count, grill_customer_count, message) VALUES
(1,1,'2025-12-05', 1, 2,'mock data from database'),
(1,1,'2025-12-06', 2, 2,'mock data from database'),
(1,1,'2025-12-07', 3, 2,'mock data from database'),
(1,1,'2025-12-08', 4, 2,'mock data from database'),
(1,1,'2025-12-09', 1, 2,'mock data from database'),
(1,1,'2025-12-10', 2, 2,'mock data from database'),
(1,1,'2025-12-11', 3, 2,'mock data from database'),
(1,1,'2025-12-12', 4, 2,'mock data from database'),
(1,1,'2025-12-13', 1, 2,'mock data from database'),
(1,1,'2025-12-14', 2, 2,'mock data from database'),
(1,1,'2025-12-15', 3, 2,'mock data from database'),
(1,1,'2025-12-16', 4, 2,'mock data from database'),
(1,1,'2025-12-17', 1, 2,'mock data from database'),
(1,1,'2025-12-18', 2, 2,'mock data from database'),
(1,1,'2025-12-19', 3, 2,'mock data from database');


-- -----------------------
-- Table `menus`
-- -----------------------
INSERT INTO `menus` (id, date, week ,special_meal, image, message) VALUES
(1,'2025-12-04', 50, 1, 'daily_menu1.jpg', 'mock data from database'),
(2,'2025-12-05', 50, 1, 'daily_menu2.jpg', 'mock data from database'),
(3,'2025-12-06', 50, 1, 'daily_menu3.jpg', 'mock data from database'),
(4,'2025-12-07', 50, 1, 'daily_menu4.jpg', 'mock data from database');

-- -----------------------
-- Table `menu_meals`
-- -----------------------
INSERT INTO `menu_meals` (`menu`, `meal`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(4, 12);

-- -----------------------
-- Table `discounts`
-- -----------------------
INSERT INTO `discounts` (`id`, discount,`discount_code`, `date_start`, `date_end`, `message`) VALUES
(1, 0.9, 'DISC10', '2025-12-01', '2025-12-31',  'mock data from database'),
(2, 0.9, 'SALMON5', '2025-12-01', '2025-12-31',  'mock data from database'),
(3, 0.9, 'CURRY3', '2025-12-05', '2025-12-20',  'mock data from database'),
(4, 0.9, 'PASTA2', '2025-12-05', '2025-12-25', 'mock data from database'),
(5, 0.9, 'PIZZA5', '2025-12-10', '2025-12-31', 'mock data from database'),
(6, 0.9, 'BURGER5', '2025-12-12', '2025-12-31',  'mock data from database'),
(7, 0.9, 'SUSHI10', '2025-12-01', '2025-12-31',  'mock data from database'),
(8, 0.9, 'RISOTTO5', '2025-12-15', '2025-12-31',  'mock data from database'),
(9, 0.9, 'STEAK10', '2025-12-01', '2025-12-31',  'mock data from database'),
(10, 0.9, 'VEGGIE5', '2025-12-20', '2025-12-31', 'mock data from database');