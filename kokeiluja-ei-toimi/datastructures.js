/**
 * Data structures used in database
 * Default values are SQL syntax so database can be generated from these structures automatically.
 */

/**
 *
 * @type {{id: string, password: string, role: string, name: string, email: string}}
 */
const user = {
    id : 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
    password: 'varchar(100)',
    role: "text NOT NULL DEFAULT 'user'",
    name: 'varchar(100)',
    email: 'varchar(100)',

}

/**
 *
 * @type {{id: string, user: string, cost: string, timestamp: string}}
 * Contents of order are store in separate link table order_items in database.
 */
const order = {
    id : 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
    user: 'INT FOREIGN KEY REFERENCES users (id)',
    cost: 'DOUBLE',
    timestamp: 'TIMESTAMP',

}

/**
 *
 * @type {{id: string, name_fi: string, name_en: string, description_fi: string, description_en: string}}
 */
const meal = {
    id : 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
    name_fi: 'varchar(50)',
    name_en: 'varchar(50)',
    description_fi: 'varchar(200)',
    description_en: 'varchar(200)',

}


export {user, order, meal};