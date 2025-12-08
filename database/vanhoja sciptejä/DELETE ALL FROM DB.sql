-- THIS DELETES ALL DATA FROM DATABASE
-- THIS IS USED ONLY WITH CAUSION
-- THIS INTENDED TO BE USED WITH MOCK DATA

-- -----------------------
-- Clear all existing data
-- -----------------------


SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM `order_items`;
DELETE FROM `orders`;
DELETE FROM `daily_menu_items`;
DELETE FROM `daily_menus`;
DELETE FROM `lunch_reservations`;
DELETE FROM `gift_cards`;
DELETE FROM `discounts`;
DELETE FROM `meals`;
DELETE FROM `locations`;
DELETE FROM `users`;

SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE `users` AUTO_INCREMENT = 1;
ALTER TABLE `locations` AUTO_INCREMENT = 1;
ALTER TABLE `meals` AUTO_INCREMENT = 1;
ALTER TABLE `orders` AUTO_INCREMENT = 1;
ALTER TABLE `gift_cards` AUTO_INCREMENT = 1;
ALTER TABLE `lunch_reservations` AUTO_INCREMENT = 1;
ALTER TABLE `daily_menus` AUTO_INCREMENT = 1;
ALTER TABLE `discounts` AUTO_INCREMENT = 1;