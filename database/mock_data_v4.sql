-- insert-mock-data.sql
-- Mock data for wsk_restaurant_schema

-- insert-mock-data.sql
-- Mock data for wsk_restaurant_schema

-- -----------------------
-- Table `users`
-- -----------------------
INSERT INTO `users` (`password`, `role`, `name`, `email`, `picture`) VALUES
('pass123', 'user', 'Alice Johnson', 'alice@example.com', 'alice.jpg'),
('pass456', 'admin', 'Bob Smith', 'bob@example.com', 'bob.jpg'),
('pass789', 'user', 'Charlie Brown', 'charlie@example.com', NULL),
('pass101', 'user', 'David Lee', 'david@example.com', 'david.jpg'),
('pass102', 'user', 'Eva Green', 'eva@example.com', 'eva.jpg'),
('pass103', 'admin', 'Frank White', 'frank@example.com', NULL),
('pass104', 'user', 'Grace Kim', 'grace@example.com', 'grace.jpg'),
('pass105', 'user', 'Henry Tan', 'henry@example.com', NULL),
('pass106', 'user', 'Ivy Chen', 'ivy@example.com', 'ivy.jpg'),
('pass107', 'user', 'Jack Liu', 'jack@example.com', NULL);

-- -----------------------
-- Table `locations`
-- -----------------------
INSERT INTO `locations` (`id`, `address`, `email`, `phone`, `table_count`) VALUES
(1, '123 Main St, Helsinki', 'helsinki@example.com', '+358401234567', 10),
(2, '456 Market St, Espoo', 'espoo@example.com', '+358402345678', 8),
(3, '789 Riverside Rd, Vantaa', 'vantaa@example.com', '+358403456789', 12),
(4, '321 Lakeview St, Turku', 'turku@example.com', '+358404567890', 15);

-- -----------------------
-- Table `meals`
-- -----------------------
INSERT INTO `meals` (`name_fi`, `name_en`, `description_fi`, `description_en`, `cost`, `picture`) VALUES
('Lihapulla', 'Meatballs', 'Perinteiset lihapullat', 'Classic meatballs', 12.5, 'meatballs.jpg'),
('Lohta', 'Salmon', 'Paistettua lohta perunoilla', 'Fried salmon with potatoes', 15.0, 'salmon.jpg'),
('Kasviskeitto', 'Vegetable Soup', 'Terveellinen kasviskeitto', 'Healthy vegetable soup', 8.0, 'veg_soup.jpg'),
('Kana Curry', 'Chicken Curry', 'Mausteinen kanacurry riisillä', 'Spicy chicken curry with rice', 13.5, 'chicken_curry.jpg'),
('Pasta Bolognese', 'Pasta Bolognese', 'Italialainen bolognese kastike pastan kanssa', 'Italian bolognese sauce with pasta', 11.0, 'pasta_bolognese.jpg'),
('Pizza Margherita', 'Pizza Margherita', 'Perinteinen Margherita pizza', 'Classic Margherita pizza', 10.0, 'pizza_margherita.jpg'),
('Pizza Pepperoni', 'Pizza Pepperoni', 'Pepperonilla täytetty pizza', 'Pepperoni pizza', 12.0, 'pizza_pepperoni.jpg'),
('Caesar Salaatti', 'Caesar Salad', 'Salaatti kanalla ja parmesaanilla', 'Salad with chicken and parmesan', 9.5, 'caesar_salad.jpg'),
('Lasagne', 'Lasagna', 'Italialainen lasagne', 'Italian lasagna', 14.0, 'lasagna.jpg'),
('Kanasalaatti', 'Chicken Salad', 'Kevyt kanasalaatti', 'Light chicken salad', 10.5, 'chicken_salad.jpg'),
('Tomaattikeitto', 'Tomato Soup', 'Terveellinen tomaattikeitto', 'Healthy tomato soup', 7.5, 'tomato_soup.jpg'),
('Hampurilainen', 'Burger', 'Juustohampurilainen', 'Cheeseburger', 11.5, 'burger.jpg'),
('Fish & Chips', 'Fish & Chips', 'Paistettua kalaa ja ranskalaisia', 'Fried fish and chips', 13.0, 'fish_chips.jpg'),
('Sushi Set', 'Sushi Set', 'Assortment of sushi', 'Assortment of sushi', 18.0, 'sushi_set.jpg'),
('Pannukakku', 'Pancake', 'Makea pannukakku', 'Sweet pancake', 6.0, 'pancake.jpg'),
('Ratatouille', 'Ratatouille', 'Kasvisruoka ranskalaisittain', 'French-style vegetable dish', 12.0, 'ratatouille.jpg'),
('Quiche', 'Quiche', 'Perinteinen quiche', 'Traditional quiche', 9.0, 'quiche.jpg'),
('Risotto', 'Risotto', 'Sienirisotto', 'Mushroom risotto', 14.0, 'risotto.jpg'),
('Tortilla', 'Tortilla', 'Täytetty tortilla', 'Stuffed tortilla', 10.0, 'tortilla.jpg'),
('Porkkana-inkiväärikeitto', 'Carrot Ginger Soup', 'Mausteinen porkkana-inkiväärikeitto', 'Spicy carrot ginger soup', 8.0, 'carrot_ginger_soup.jpg'),
('Grillattu Lohi', 'Grilled Salmon', 'Grillattua lohta ja vihanneksia', 'Grilled salmon with vegetables', 16.0, 'grilled_salmon.jpg'),
('Beef Steak', 'Beef Steak', 'Paistettua pihviä', 'Grilled beef steak', 20.0, 'beef_steak.jpg'),
('Veggie Burger', 'Veggie Burger', 'Kasvisburger', 'Vegetarian burger', 11.0, 'veggie_burger.jpg');

-- -----------------------
-- Table `orders`
-- -----------------------
INSERT INTO `orders` (`user_id`, `cost_total`, `timestamp`, `location`) VALUES
(1, 25.0, '2025-12-01 12:30:00', 1),
(2, 15.0, '2025-12-02 13:00:00', 2),
(3, 32.0, '2025-12-03 18:45:00', 3),
(4, 45.5, '2025-12-04 19:00:00', 4),
(5, 22.0, '2025-12-05 12:15:00', 1),
(6, 50.0, '2025-12-05 18:00:00', 2);

-- -----------------------
-- Table `gift_cards`
-- -----------------------
INSERT INTO `gift_cards` (`expiration_date`, `password`, `value`) VALUES
('2026-01-01', 'GC123', 50.0),
('2026-06-30', 'GC456', 100.0),
('2026-03-01', 'GC789', 75.0),
('2026-05-15', 'GC101', 30.0),
('2026-07-20', 'GC102', 60.0),
('2026-08-31', 'GC103', 120.0),
('2026-10-10', 'GC104', 25.0),
('2026-11-11', 'GC105', 40.0),
('2026-12-01', 'GC106', 90.0),
('2027-01-01', 'GC107', 150.0);

-- -----------------------
-- Table `lunch_reservations`
-- -----------------------
INSERT INTO `lunch_reservations` (`date`, `location`) VALUES
('2025-12-05', 1),
('2025-12-06', 2),
('2025-12-07', 3),
('2025-12-08', 4),
('2025-12-09', 1),
('2025-12-10', 2),
('2025-12-11', 3),
('2025-12-12', 4),
('2025-12-13', 1),
('2025-12-14', 2),
('2025-12-15', 3),
('2025-12-16', 4),
('2025-12-17', 1),
('2025-12-18', 2),
('2025-12-19', 3);

-- -----------------------
-- Table `order_items`
-- -----------------------
INSERT INTO `order_items` (`order_id`, `type`, `amount`, `meal_id`, `gift_card_id`, `lunch_reservation_id`) VALUES
(1, 'meal', 2, 1, NULL, NULL),
(1, 'meal', 1, 3, NULL, NULL),
(2, 'gift_card', 1, NULL, 1, NULL),
(2, 'lunch_reservation', 1, NULL, NULL, 2),
(3, 'meal', 1, 4, NULL, NULL),
(3, 'meal', 2, 5, NULL, NULL),
(4, 'meal', 1, 6, NULL, NULL),
(4, 'meal', 2, 7, NULL, NULL),
(5, 'gift_card', 2, NULL, 3, NULL),
(5, 'lunch_reservation', 1, NULL, NULL, 5),
(6, 'meal', 1, 8, NULL, NULL),
(6, 'meal', 1, 9, NULL, NULL);

-- -----------------------
-- Table `daily_menus`
-- -----------------------
INSERT INTO `daily_menus` (`date`, `picture`, `location`) VALUES
('2025-12-04', 'daily_menu1.jpg', 1),
('2025-12-05', 'daily_menu2.jpg', 2),
('2025-12-06', 'daily_menu3.jpg', 3),
('2025-12-07', 'daily_menu4.jpg', 4);

-- -----------------------
-- Table `daily_menu_items`
-- -----------------------
INSERT INTO `daily_menu_items` (`daily_menu_id`, `meal_id`) VALUES
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
INSERT INTO `discounts` (`id`, `discount_code`, `date_start`, `date_end`, `target_meal`, `cost_override`) VALUES
(1, 'DISC10', '2025-12-01', '2025-12-31', 1, 10.0),
(2, 'SALMON5', '2025-12-01', '2025-12-31', 2, 12.0),
(3, 'CURRY3', '2025-12-05', '2025-12-20', 4, 11.0),
(4, 'PASTA2', '2025-12-05', '2025-12-25', 5, 9.0),
(5, 'PIZZA5', '2025-12-10', '2025-12-31', 6, 8.0),
(6, 'BURGER5', '2025-12-12', '2025-12-31', 12, 10.0),
(7, 'SUSHI10', '2025-12-01', '2025-12-31', 14, 16.0),
(8, 'RISOTTO5', '2025-12-15', '2025-12-31', 18, 12.0),
(9, 'STEAK10', '2025-12-01', '2025-12-31', 19, 18.0),
(10, 'VEGGIE5', '2025-12-20', '2025-12-31', 20, 9.0);