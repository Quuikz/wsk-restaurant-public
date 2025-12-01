
//TODO: everything here

/*
TODO:
   Should discount return all fields including discount_code??
   Or should that depend on wheter user is admin.
 */


//example datastructure
import {default_discount} from "../../../../database/datastructures.js";

const discountArray = [
    {...default_discount, id: 1, message: "discount number 1 in discount model"},
    {default_discount, id: 2, message: "discount number 2 in discount model"},
    {default_discount, id: 3, message: "discount number 3 in discount model"},
];

const listAllDiscounts = async () => {
    return [
        {text: 'listAllDiscounts hard coded response from discount-model.js'},
        {...default_discount},
        {...default_discount},
        {...default_discount},
    ];
};

const findDiscountById = async (id) => {
    return {text: 'findDiscountById hard coded response from discount-model.js', ...default_discount};
};

const addDiscount = async (discount) => {
    return {text: 'addDiscount hard coded response from discount-model.js', ...default_discount};
};

const modifyDiscount = async (discount, discountId) => {
    return {text: 'modifyDiscount hard coded response from discount-model.js', ...default_discount};
};

const removeDiscount = async (discountId) => {
    return {text: 'removeDiscount hard coded response from discount-model.js', ...default_discount};
};

const findDiscountByMeal = async (mealId) => {
    return [default_discount, default_discount];
}

export {
    listAllDiscounts,
    findDiscountById,
    addDiscount,
    modifyDiscount,
    removeDiscount,
    findDiscountByMeal
};
