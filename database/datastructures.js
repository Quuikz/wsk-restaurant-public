/**
 * @type {{id: number, password: string, role: string, name: string, email: string}}
 */
const default_user = {
    id : 0,
    password: '',
    role: '',
    name: '',
    email: '',
}


/**
 *
 * @type {{id: number, name_fi: string, name_en: string, description_fi: string, description_en: string, cost: number, type: string}}
 * type - type of item sold
 */
const default_meal = {
    id : 0,
    name_fi: "suomenkielinen nimi",
    name_en: "english name",
    description_fi: "suomalainen kuvaus tuotteelle",
    description_en: "english description for the item",
    cost: 0.0,
    type: "noudettava annos/ pöytävaraus / lahjakortti ?",
    image: "public/images/burger.jpg"
}

/**
 *
 * @type {{id: number, user: number, cost: string, timestamp: string, location: string, items: ({id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}|number)[][]}}
 */
const default_order = {
    id : 0,
    user: 0,    //user.id = who made the order
    cost: '',
    timestamp: '',
    location: '',       //location if multiple restaurants
    items: [
        {item : "item_id1", amount: 0 },
        {item : "item_id2", amount: 0 }
    ] //array of arrays of items and amounts [ {item} , amount ]

}


/**
 * Menu for a day.
 * @type {{id: number, date: string, items: ({id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}|number)[][]}}
 */
const default_menu = {
    id : 0,
    date : '', //date format?
    items : [
        {item : "item_id", amount: 0 },
        {item : "item_id", amount: 0 }
    ]  //array containing objects {item, amount}
}

/**
 * Restaurant location data.
 */
const default_location = {
    id : 0,
    address : '',
    email : '',
    phone : '',
    table_count : 10
}


export {
    default_user,
    default_meal,
    default_order,
    default_menu,
    default_location,
}

