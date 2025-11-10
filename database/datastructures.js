/**
 * @type {{id: number, password: string, role: string, name: string, email: string}}
 */
const user = {
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
const item = {
    id : 0,
    name_fi: 'suomenkielinen nimi',
    name_en: 'english name',
    description_fi: 'suomalainen kuvaus tuotteelle',
    description_en: 'english description for the item',
    cost: 0.0,
    type: 'noudettava annos/ pöytävaraus / lahjakortti ?'
}

/**
 *
 * @type {{id: number, user: number, cost: string, timestamp: string, location: string, items: ({id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}|number)[][]}}
 */
const order = {
    id : 0,
    user: 0,    //user.id = who made the order
    cost: '',
    timestamp: '',
    location: '',       //location if multiple restaurants
    items: [[item,0]] //array of arrays of items and amounts [ {item} , amount ]

}


/**
 * Menu for a day.
 * @type {{id: number, date: string, items: ({id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}|number)[][]}}
 */
const daily_menu = {
    id : 0,
    date : '', //
    items : [
        {item : item, amount: 0 }
    ]  //array containing objects {item, amount}
}

console.log(daily_menu.items);

