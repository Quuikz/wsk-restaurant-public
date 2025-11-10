/**
 * @type {{id: number, password: string, role: string, name: string, email: string}}
 */
let user = {
    id : 0,
    password: '',
    role: '',
    name: '',
    email: '',
}

/**
 *
 * @type {{id: number, user: number, cost: string, timestamp: string, location: string, items: ({id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}|number)[][]}}
 */
let order = {
    id : 0,
    user: 0,    //user.id = who made the order
    cost: '',
    timestamp: '',
    location: '',
    items: [[item,0]] //array of arrays of items and amounts [ {item} , amount ]

}

/**
 *
 * @type {{id: number, name_fi: string, name_en: string, description_fi: string, description_en: string}}
 */
let item = {
    id : 0,
    name_fi: 'suomenkielinen nimi',
    name_en: 'english name',
    description_fi: 'suomalainen kuvaus tuotteelle',
    description_en: 'english description for the item',

}