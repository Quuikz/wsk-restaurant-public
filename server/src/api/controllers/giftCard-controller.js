'use strict';


import {
    listAllGiftCards,
    findGiftCardById,
    addGiftCard,
    modifyGiftCard,
    removeGiftCard,
    findGiftCardsByUserId, findGiftCardByPassword,
} from "../models/giftCard-model.js";
import {findOrdersByUserId} from "../models/order-model.js";


const getGiftCards = (req, res) => {
    console.log('getGiftCards in giftCard-controller')

    listAllGiftCards().then(
        (result) => {
            if (result) {
                res.json(result);
            } else {
                console.log('no giftCards found');
                res.status(200).send("no giftCards found");
            }
        },

        (result) => {
            console.log('error in getGiftCards in giftCard-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const getGiftCardById = (req, res) => {
    console.log('getGiftCardById in giftCard-controller')
    console.log(req.params.id);
    const giftCard = findGiftCardById(req.params.id);
    giftCard.then(
        (giftCard) => {
            if (giftCard) {
                console.log('return giftCard'+req.params.id)
                res.json(giftCard);

            } else {
                res.sendStatus(404);
            }
        },
        (result) => {
            console.log('error in getGiftCardById in giftCard-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const postGiftCard = (req, res) => {
    console.log('postGiftCard in giftCard-controller');
    console.log(req.body);

    const result = addGiftCard(req.body);
    result.then(
        (result) => {
            if (result) {
                console.log('added giftCard: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        (result) => {
            console.log('error in postGiftCard in giftCard-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const putGiftCard = (req, res) => {
    console.log('putGiftCard in giftCard-controller');
    console.log(req.body);
    console.log(req.params.id);

    const result = modifyGiftCard(req.body, req.params.id);
    result.then(
        (result) => {
            if (result) {
                console.log('return giftCard: '+result)
                res.json(result);
            } else {
                res.sendStatus(404);
            }
        },
        (result) => {
            console.log('error in putGiftCard in giftCard-controller');
            console.log(result);
            res.sendStatus(500);
        }
    );
};

const deleteGiftCard = (req, res) => {
    console.log('deleteGiftCard in giftCard-controller');
    console.log(req.params.id);
    console.log('user authenticated:' +res.locals.user);


    let success = removeGiftCard(req.params.id);
    success.then(
        (success) => {
            if (success) {
                console.log('giftcard removed:',req.params.id);
                res.status(200).send('giftcard removed');

            } else {
                console.log('deleteGiftCard: giftCard not found');
                res.sendStatus(404);
            }
        },
        (error) => {
            console.log('error in deleteGiftCard in giftCard-controller');
            console.log(error);
            res.sendStatus(500);
        }
    );
}

/**
 * Responds with and array of giftcards.
 * @param req
 * @param res
 */
const getGiftCardsByUserId = (req, res) => {
    console.log('getGiftCardsByUserId in order-controller')
    console.log(req.params.id);

    const giftCardArray = findGiftCardsByUserId(req.params.id);
    giftCardArray.then(
        giftCardArray => {
            if (giftCardArray) {
                console.log('number of giftcards for user ',req.params.id, giftCardArray.length);

                //remove hashed passwords from giftcards
                const giftCardArrayWithoutPassword = [];
                for(const giftCard of giftCardArray) {
                    const giftCardWithoutPassword = {
                        id : giftCard.id,
                        value: giftCard.value,
                        expiration_date : giftCard.expiration_date,
                        redeemed: giftCard.redeemed,
                        order: giftCard.order,
                        user : giftCard.user,
                    };
                    giftCardArrayWithoutPassword.push(giftCardWithoutPassword);
                }
                //return the array
                res.json(giftCardArrayWithoutPassword);

            } else {
                res.sendStatus(404);
            }
        },
        error => {
            console.log('error in getGiftCardsByUserId in redeemGiftCard-controller');
            console.log(error);
            res.sendStatus(500);
        }
    );

}


const getGiftCardValidation = (req, res) => {
    try {
        //this should check if the giftcard password is valid and the valid giftcard has not been redeemed.
        console.log('validateGiftCard in giftCard-controller')
        console.log('giftcard password:', req.body.password);

        findGiftCardByPassword(req.body.password).then(
            (giftCard) => {
                if (giftCard) {
                    console.log('giftcard found, redeemed:', giftCard.redeemed);

                    const giftCardWithoutPassword = {
                        id: giftCard.id,
                        value: giftCard.value,
                        expiration_date: giftCard.expiration_date,
                        redeemed: giftCard.redeemed,
                        order: giftCard.order,
                        user: giftCard.user,
                    };

                    res.json(giftCardWithoutPassword);

                } else {
                    console.log('no giftcard found in getGiftCardValidation');
                    res.status(404).send('No giftcard found.');
                }
            },
            (result) => {
                console.log('error in getGiftCardValidation in giftCard-controller');
                console.log(result);
                res.sendStatus(500);
            }
        );
    } catch (err) {
        console.log('error in getGiftCardValidation in giftCard-controller');
        res.sendStatus(500);
    }
}


/**
 * Find a giftcard by given giftcard password and sets it redeemed.
 * @param req
 * @param res
 */
const redeemGiftCard = (req, res) => {
    try {
        console.log('redeemGiftCard in giftCard-controller')
        console.log('giftcard password:', req.body.password);

        const giftCard = findGiftCardByPassword(req.body.password);
        giftCard.then(
            (giftCard) => {
                if (giftCard) {
                    console.log('giftcard found, redeemed:', giftCard.redeemed);

                    modifyGiftCard({redeemed: true}, giftCard.id).then(
                            (updatedGiftCard) => {
                                if (updatedGiftCard.redeemed) {
                                    console.log('giftcard set to redeemed:', updatedGiftCard.redeemed);

                                    const giftCardWithoutPassword = {
                                        id : updatedGiftCard.id,
                                        value: updatedGiftCard.value,
                                        expiration_date : updatedGiftCard.expiration_date,
                                        redeemed: updatedGiftCard.redeemed,
                                        order: updatedGiftCard.order,
                                        user : updatedGiftCard.user,
                                    };

                                    res.json(giftCardWithoutPassword);

                                } else {
                                    console.log('error in redeemGiftCard in redeemGiftCard-controller');
                                    res.sendStatus(500);
                                }
                            },
                            (error)=>{
                                console.log(error);
                            }
                    );

                } else {
                    console.log('no giftcard found in redeemGiftCard');
                    res.status(404).send('No giftcard found.');
                }
            },
            (result) => {
                console.log('error in redeemGiftCard in redeemGiftCard-controller');
                console.log(result);
                res.sendStatus(500);
            }
        );

    } catch (error) {
        console.log('error in redeemGiftCard in redeemGiftCard-controller');
        console.log(error);
        res.sendStatus(500);
    }
}



export {
    getGiftCards,
    getGiftCardById,
    postGiftCard,
    putGiftCard,
    deleteGiftCard,
    getGiftCardsByUserId,
    getGiftCardValidation,
    redeemGiftCard
};