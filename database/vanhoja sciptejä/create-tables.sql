#drop tables
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS
    users,
    items,
    order_items,
    orders,
    daily_menu_items,
    daily_menus;
SET FOREIGN_KEY_CHECKS = 1;

#users
CREATE TABLE users
(
    id       INT  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    password varchar(100),
    role     text NOT NULL DEFAULT 'user',
    name     varchar(100),
    email    varchar(100)
);

#items sold in restaurants
CREATE TABLE items
(
    id             INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_fi        varchar(50),
    name_en        varchar(50),
    description_fi varchar(200),
    description_en varchar(200),
    cost           FLOAT,
    type           varchar(50)
);

#orders made by users
CREATE TABLE orders
(
    id        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id   INT,
    cost      DOUBLE,
    timestamp TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users (id)
);


#link table for orders and items
CREATE TABLE order_items
(
    order_id INT NOT NULL,
    item_id  INT NOT NULL,
    amount   INT NOT NULL,

    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);

#daily menus
CREATE TABLE daily_menus
(
    id   INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE
);

#daily menu - item link table
CREATE TABLE daily_menu_items
(
    daily_menu_id INT,
    item_id       INT NOT NULL,

    FOREIGN KEY (daily_menu_id) REFERENCES daily_menus (id),
    FOREIGN KEY (item_id) REFERENCES items (id)

);