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
    cost: '',
    timestamp: '',
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
    date : '2026-12-06', //date format
    location: 0,
    special_meal: 1,
    meals : [1, 2 ],
    message: 'default menu. meals array contains meal.id '
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
    date : "date",
    location : 0,
    table_count : 1,
    customer_count : 2,
    message : 'default reservation',
}

const default_discount = {
    id : 0,
    target_meal: 1,
    cost_override: 6.9,
    discount_code : "just in case getting the discount needs a code",
    date_start: "some start date",
    date_end: "some end date",
    message: "cost_override is the discounted cost"
}

const default_giftCard = {
    id : 0,
    value: 15.5,
    expiration_date : "20260101",
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

