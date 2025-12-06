/**
 * @type {{id: number, password: string, role: string, name: string, email: string}}
 */
const default_user = {
    id : 0,
    username : "default username",
    password: "default name",
    role: "user",
    name: "default",
    email: "default",
    message: 'default user object, image at //hostname:port/images/users/placeholder.jpg',
    image: "placeholder.jpg"
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
    type: "?",
    image: "burger.jpg",
    message: 'default meal object image at: //hostname:port/images/meals/burger.jpg,'
}

/**
 *
 * @type {{id: number, user: number, cost: string, timestamp: string, location: string, items: ({id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}|number)[][]}}
 */
const default_order = {
    id : 0,
    user: 0,    //user.id = who made the order
    cost: 10.5,
    timestamp: '2025-12-06 12:00:00',
    location: 0,       //location if multiple restaurants
    items: [
        {amount: 1, meal: 1 },
        {amount: 1, meal: 2 }
    ],
    reservations : [ 1 ],
    gift_cards: [ 1 ],
    message: 'items = array of {amount, meal.id} reservations = array of reservation id, gift_cards = array of card id'
}


/**
 * Menu for a day.
 * @type {{id: number, date: string, meals: [{id: number, name_fi: string, name_en: string, description_fi: string, description_en: string, cost: number, type: string, image: string},{id: number, name_fi: string, name_en: string, description_fi: string, description_en: string, cost: number, type: string, image: string}], message: string}}
 */
const default_menu = {
    id : 0,
    date : '2025-12-06', //date format
    week: 12, //week number
    location: 0,
    special_meal: 1,
    meals : [1,2,3],
    image: "placeholder.jpg",
    message: 'default menu. meals array contains meal.id values. date format: YYYY-MM-DD'
}

/**
 * Restaurant location data.
 */
const default_location = {
    id : 0,
    name: "",
    address : '',
    email : '',
    phone : '',
    table_count : 10,
    message: 'default location'
}

/**
 * Reservation data
 */
const default_reservation = {
    id : 0,
    user: 1,
    order : 1,
    date : "2025-12-06",
    location : 0,
    table_count : 1,
    customer_count : 2,
    message : 'default reservation',
}

const default_discount = {
    id : 0,
    menu: 1,
    meal: 1,
    type: 'fixed/percent/allMealsInMenu/whatever', //use this to set how you want a discount to apply
    cost_override: 6.9,   //cost_override is used for setting a discounted price
    cost_multiplier: 0.9,  //cost_multiplier is used for percentage discount
    discount_code : "just in case getting the discount needs a code",
    date_start: "2025-12-06",
    date_end: "2025-12-06",
    message: "cost_override is used for setting a discounted price, cost_multiplier is used for percentage discount, Start and end dates are redundant if menu is used to target the discount"
}

const default_giftCard = {
    id : 0,
    value: 15.5,
    expiration_date : "2026-01-01",
    password: "giftcardpassword",
    redeemed: false,
    message : "defauld giftcard, password is used to validate the giftcard, redeemed: boolean indicates if card has been redeemed",
    order: 0,
    user : 0,
}



export {
    default_user,
    default_meal,
    default_order,
    default_menu,
    default_location,
    default_reservation,
    default_discount,
    default_giftCard
}

