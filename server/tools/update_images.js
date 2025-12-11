import fetchData from "../../client/src/utils/fetchData.js";

const meals = [
  {
    "id": 1,
    "name_fi": "Lihapulla",
    "name_en": "Meatballs",
    "description_fi": "Perinteiset lihapullat",
    "cost": 12.5,
    "type": null,
    "description_en": "Classic meatballs",
    "image": "meatballs.jpg",
    "message": "mock data from database"
  },
  {
    "id": 2,
    "name_fi": "Lohta",
    "name_en": "Salmon",
    "description_fi": "Paistettua lohta perunoilla",
    "cost": 15,
    "type": null,
    "description_en": "Fried salmon with potatoes",
    "image": "salmon.jpg",
    "message": "mock data from database"
  },
  {
    "id": 3,
    "name_fi": "Kasviskeitto",
    "name_en": "Vegetable Soup",
    "description_fi": "Terveellinen kasviskeitto",
    "cost": 8,
    "type": null,
    "description_en": "Healthy vegetable soup",
    "image": "veg_soup.jpg",
    "message": "mock data from database"
  },
  {
    "id": 4,
    "name_fi": "Kana Curry",
    "name_en": "Chicken Curry",
    "description_fi": "Mausteinen kanacurry riisillä",
    "cost": 13.5,
    "type": null,
    "description_en": "Spicy chicken curry with rice",
    "image": "chicken_curry.jpg",
    "message": "mock data from database"
  },
  {
    "id": 5,
    "name_fi": "Pasta Bolognese",
    "name_en": "Pasta Bolognese",
    "description_fi": "Italialainen bolognese kastike pastan kanssa",
    "cost": 11,
    "type": null,
    "description_en": "Italian bolognese sauce with pasta",
    "image": "pasta_bolognese.jpg",
    "message": "mock data from database"
  },
  {
    "id": 6,
    "name_fi": "Pizza Margherita",
    "name_en": "Pizza Margherita",
    "description_fi": "Perinteinen Margherita pizza",
    "cost": 10,
    "type": null,
    "description_en": "Classic Margherita pizza",
    "image": "pizza_margherita.jpg",
    "message": "mock data from database"
  },
  {
    "id": 7,
    "name_fi": "Pizza Pepperoni",
    "name_en": "Pizza Pepperoni",
    "description_fi": "Pepperonilla täytetty pizza",
    "cost": 12,
    "type": null,
    "description_en": "Pepperoni pizza",
    "image": "pizza_pepperoni.jpg",
    "message": "mock data from database"
  },
  {
    "id": 8,
    "name_fi": "Caesar Salaatti",
    "name_en": "Caesar Salad",
    "description_fi": "Salaatti kanalla ja parmesaanilla",
    "cost": 9.5,
    "type": null,
    "description_en": "Salad with chicken and parmesan",
    "image": "caesar_salad.jpg",
    "message": "mock data from database"
  },
  {
    "id": 9,
    "name_fi": "Lasagne",
    "name_en": "Lasagna",
    "description_fi": "Italialainen lasagne",
    "cost": 14,
    "type": null,
    "description_en": "Italian lasagna",
    "image": "lasagna.jpg",
    "message": "mock data from database"
  },
  {
    "id": 10,
    "name_fi": "Kanasalaatti",
    "name_en": "Chicken Salad",
    "description_fi": "Kevyt kanasalaatti",
    "cost": 10.5,
    "type": null,
    "description_en": "Light chicken salad",
    "image": "chicken_salad.jpg",
    "message": "mock data from database"
  },
  {
    "id": 11,
    "name_fi": "Tomaattikeitto",
    "name_en": "Tomato Soup",
    "description_fi": "Terveellinen tomaattikeitto",
    "cost": 7.5,
    "type": null,
    "description_en": "Healthy tomato soup",
    "image": "tomato_soup.jpg",
    "message": "mock data from database"
  },
  {
    "id": 12,
    "name_fi": "Hampurilainen",
    "name_en": "Burger",
    "description_fi": "Juustohampurilainen",
    "cost": 11.5,
    "type": null,
    "description_en": "Cheeseburger",
    "image": "burger.jpg",
    "message": "mock data from database"
  },
  {
    "id": 13,
    "name_fi": "Fish & Chips",
    "name_en": "Fish & Chips",
    "description_fi": "Paistettua kalaa ja ranskalaisia",
    "cost": 13,
    "type": null,
    "description_en": "Fried fish and chips",
    "image": "fish_chips.jpg",
    "message": "mock data from database"
  },
  {
    "id": 14,
    "name_fi": "Sushi Set",
    "name_en": "Sushi Set",
    "description_fi": "Assortment of sushi",
    "cost": 18,
    "type": null,
    "description_en": "Assortment of sushi",
    "image": "sushi_set.jpg",
    "message": "mock data from database"
  },
  {
    "id": 15,
    "name_fi": "Pannukakku",
    "name_en": "Pancake",
    "description_fi": "Makea pannukakku",
    "cost": 6,
    "type": null,
    "description_en": "Sweet pancake",
    "image": "pancake.jpg",
    "message": "mock data from database"
  },
  {
    "id": 16,
    "name_fi": "Ratatouille",
    "name_en": "Ratatouille",
    "description_fi": "Kasvisruoka ranskalaisittain",
    "cost": 12,
    "type": null,
    "description_en": "French-style vegetable dish",
    "image": "ratatouille.jpg",
    "message": "mock data from database"
  },
  {
    "id": 17,
    "name_fi": "Quiche",
    "name_en": "Quiche",
    "description_fi": "Perinteinen quiche",
    "cost": 9,
    "type": null,
    "description_en": "Traditional quiche",
    "image": "quiche.jpg",
    "message": "mock data from database"
  },
  {
    "id": 18,
    "name_fi": "Risotto",
    "name_en": "Risotto",
    "description_fi": "Sienirisotto",
    "cost": 14,
    "type": null,
    "description_en": "Mushroom risotto",
    "image": "risotto.jpg",
    "message": "mock data from database"
  },
  {
    "id": 19,
    "name_fi": "Tortilla",
    "name_en": "Tortilla",
    "description_fi": "Täytetty tortilla",
    "cost": 10,
    "type": null,
    "description_en": "Stuffed tortilla",
    "image": "tortilla.jpg",
    "message": "mock data from database"
  },
  {
    "id": 20,
    "name_fi": "Porkkana-inkiväärikeitto",
    "name_en": "Carrot Ginger Soup",
    "description_fi": "Mausteinen porkkana-inkiväärikeitto",
    "cost": 8,
    "type": null,
    "description_en": "Spicy carrot ginger soup",
    "image": "carrot_ginger_soup.jpg",
    "message": "mock data from database"
  },
  {
    "id": 21,
    "name_fi": "Grillattu Lohi",
    "name_en": "Grilled Salmon",
    "description_fi": "Grillattua lohta ja vihanneksia",
    "cost": 16,
    "type": null,
    "description_en": "Grilled salmon with vegetables",
    "image": "grilled_salmon.jpg",
    "message": "mock data from database"
  },
  {
    "id": 22,
    "name_fi": "Beef Steak",
    "name_en": "Beef Steak",
    "description_fi": "Paistettua pihviä",
    "cost": 20,
    "type": null,
    "description_en": "Grilled beef steak",
    "image": "beef_steak.jpg",
    "message": "mock data from database"
  },
  {
    "id": 23,
    "name_fi": "Veggie Burger",
    "name_en": "Veggie Burger",
    "description_fi": "Kasvisburger",
    "cost": 11,
    "type": null,
    "description_en": "Vegetarian burger",
    "image": "veggie_burger.jpg",
    "message": "mock data from database"
  }

]

const SERVER_URL = "http://localhost:3000"
const API_URL = "http://localhost:3000/api"

//Update meal info
async function updateMealInfo (data, token, mealID) {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const updatedMealResult = await fetchData(
    API_URL + `/meals/${mealID}`,
    fetchOptions,
  );
  return updatedMealResult;
};

async function postLogin (inputs) {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };

  const loginResult = await fetchData(
    SERVER_URL + '/api/auth/login',
    fetchOptions,
  );
  return loginResult;
};


////main

const { token, user } = await postLogin({
  "username": "admin",
  "password": "password"
});
console.log('user:',user);

for (const meal of meals) {

  const mealString  = meal.image.toString();

  const newString = mealString.replace('.jpg','.webp');
  console.log(mealString, newString);

  //change meal image
  const newMeal = {
    id : meal.id,
    image : newString
  };


  const putResponse = await updateMealInfo(newMeal, token, meal.id)
  console.log(putResponse);
}


/*
meatballs.jpg meatballs.webp
salmon.jpg salmon.webp
veg_soup.jpg veg_soup.webp
chicken_curry.jpg chicken_curry.webp
pasta_bolognese.jpg pasta_bolognese.webp
pizza_margherita.jpg pizza_margherita.webp
pizza_pepperoni.jpg pizza_pepperoni.webp
caesar_salad.jpg caesar_salad.webp
lasagna.jpg lasagna.webp
chicken_salad.jpg chicken_salad.webp
tomato_soup.jpg tomato_soup.webp
burger.jpg burger.webp
fish_chips.jpg fish_chips.webp
sushi_set.jpg sushi_set.webp
pancake.jpg pancake.webp
ratatouille.jpg ratatouille.webp
quiche.jpg quiche.webp
risotto.jpg risotto.webp
tortilla.jpg tortilla.webp
carrot_ginger_soup.jpg carrot_ginger_soup.webp
grilled_salmon.jpg grilled_salmon.webp
beef_steak.jpg beef_steak.webp
veggie_burger.jpg veggie_burger.webp

*/
