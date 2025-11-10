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
    description_en varchar(200)
);

#orders made by users
CREATE TABLE orders
(
    id        INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id      INT ,
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