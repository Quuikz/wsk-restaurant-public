
//TODO: everything here

/*
TODO:
   Should discount return all fields including discount_code??
   Or should that depend on wheter user is admin.
 */


//example datastructure
import {default_discount} from "../../../../database/datastructures.js";

const discounts = [
    {...default_discount, id: 1, target_meal: 600, message: "discount number 1 in discount model"},
    {...default_discount, id: 2, target_meal: 700, message: "discount number 2 in discount model"},
    {...default_discount, id: 3, target_meal: 700, message: "discount number 3 in discount model"},
];

/**
 *
 * @return {Promise<[{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string},{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}]|boolean>}
 * array of all objects or false if error
 */
const listAllDiscounts = async () => {
    try {
        return discounts;

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 * @param id
 * @return {Promise<{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|boolean>}
 * first object that has the id or false if not found or error
 */
const findDiscountById = async (id) => {
    try {
        const resultArray = discounts.filter(discount => discount.id === Number(id));
        if (resultArray.length > 0) {
            return resultArray[0];
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param discount
 * @return {Promise<{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}>}
 * object added to array/database or false if fails
 */
const addDiscount = async (discount) => {
    try {
        discounts.push(discount);
        return discounts[discounts.length - 1];
    } catch (error) {
        console.log(error);
        return false;
    }
};


/**
 *
 * @param discount discount object
 * @param discountId number
 * @return {Promise<*|boolean>}
 * discount or false if error or not found
 */
const modifyDiscount = async (discount, discountId) => {
    try {
        console.log('modifyDiscount: ',discountId, discount);
        const index = discounts.findIndex( (d) => {
            console.log(d.id, discountId);
            return  d.id === Number(discountId);  //Has to be number!
        } );


        if (index >= 0) {
            console.log('found at:'+index);
            discounts.splice(index,1, {...discounts[index], ...discount });
            return discounts[index];

        } else {
            console.log('not found: ',discountId);
            return false;
        }

    } catch (error) {
        console.log(error);
        return false;
    }
};

/**
 *
 * @param discountId number
 * @return {Promise<boolean>} false if not found
 */
const removeDiscount = async (discountId) => {
    try {
        const index = discounts.findIndex(discount => discount.id === Number(discountId));
        if (index >= 0) {
            discounts.splice(index,1);
            return true;

        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }

};

/**
 * @param mealId
 * @return {Promise<{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|{id: number, target_meal: number, cost_override: number, discount_code: string, date_start: string, date_end: string, message: string}|boolean>}
 * array filtered by id given or false if error
 */
const findDiscountByMeal = async (mealId) => {
    try {
        const resultArray = discounts.filter(discount => discount.target_meal === Number(mealId));
        if (resultArray) {
            return resultArray;
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    listAllDiscounts,
    findDiscountById,
    addDiscount,
    modifyDiscount,
    removeDiscount,
    findDiscountByMeal
};
