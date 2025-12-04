-- insert-mock-data.sql
-- Mock data for wsk_restaurant_schema

-- -----------------------
-- Table `users`
-- -----------------------
INSERT INTO `users` (`password`, `role`, `name`, `email`, `picture`) VALUES
('pass123', 'user', 'Alice Johnson', 'alice@example.com', 'alice.jpg'),
('pass456', 'admin', 'Bob Smith', 'bob@example.com', 'bob.jpg'),
('pass789', 'user', 'Charlie Brown', 'charlie@example.com', NULL);

-- -----------------------
-- Table `locations`
-- -----------------------
INSERT INTO `locations` (`id`, `address`, `email`, `phone`, `table_count`) VALUES
(1, '123 Main St, Helsinki', 'helsinki@example.com', '+358401234567', 10),
(2, '456 Market St, Espoo', 'espoo@example.com', '+358402345678', 8);

-- -----------------------
-- Table `meals`
-- -----------------------
INSERT INTO `meals` (`name_fi`, `name_en`, `description_fi`, `description_en`, `cost`, `picture`) VALUES
('Lihapulla', 'Meatballs', 'Perinteiset lihapullat', 'Classic meatballs', 12.5, 'meatballs.jpg'),
('Lohta', 'Salmon', 'Paistettua lohta perunoilla', 'Fried salmon with potatoes', 15.0, 'salmon.jpg'),
('Kasviskeitto', 'Vegetable Soup', 'Terveellinen kasviskeitto', 'Healthy vegetable soup', 8.0, 'veg_soup.jpg');

-- -----------------------
-- Table `orders`
-- -----------------------
INSERT INTO `orders` (`user_id`, `cost_total`, `timestamp`, `location`) VALUES
(1, 25.0, '2025-12-01 12:30:00', 1),
(2, 15.0, '2025-12-02 13:00:00', 2);

-- -----------------------
-- Table `gift_cards`
-- -----------------------
INSERT INTO `gift_cards` (`expiration_date`, `password`, `value`) VALUES
('2026-01-01', 'GC123', 50.0),
('2026-06-30', 'GC456', 100.0);

-- -----------------------
-- Table `lunch_reservations`
-- -----------------------
INSERT INTO `lunch_reservations` (`date`, `location`) VALUES
('2025-12-05', 1),
('2025-12-06', 2);

-- -----------------------
-- Table `order_items`
-- -----------------------
INSERT INTO `order_items` (`order_id`, `type`, `amount`, `meal_id`, `gift_card_id`, `lunch_reservation_id`) VALUES
(1, 'meal', 2, 1, NULL, NULL),
(1, 'meal', 1, 3, NULL, NULL),
(2, 'gift_card', 1, NULL, 1, NULL),
(2, 'lunch_reservation', 1, NULL, NULL, 2);

-- -----------------------
-- Table `daily_menus`
-- -----------------------
INSERT INTO `daily_menus` (`date`, `picture`, `location`) VALUES
('2025-12-04', 'daily_menu1.jpg', 1),
('2025-12-05', 'daily_menu2.jpg', 2);

-- -----------------------
-- Table `daily_menu_items`
-- -----------------------
INSERT INTO `daily_menu_items` (`daily_menu_id`, `meal_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3);

-- -----------------------
-- Table `discounts`
-- -----------------------
INSERT INTO `discounts` (`id`, `discount_code`, `date_start`, `date_end`, `target_meal`, `cost_override`) VALUES
(1, 'DISC10', '2025-12-01', '2025-12-31', 1, 10.0),
(2, 'SALMON5', '2025-12-01', '2025-12-31', 2, 12.0);