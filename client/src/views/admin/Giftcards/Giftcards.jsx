import { useEffect, useState } from "react";
import { useGiftcards } from "../../../hooks/admin/apiHooks";
import GiftCardRow from "../../../components/admin/GiftCardrow";


const GiftcardsAdmin = () => {

    const { getAllGiftCards } = useGiftcards();
    const [ giftCards, setGiftCards ] = useState([]);


    const loadAllGiftCards = async() => {
        const token = localStorage.getItem('token');
        try{
            const giftCardsData = await getAllGiftCards(token);
            //console.log(giftCardsData);
            setGiftCards(giftCardsData);
        }
        catch(error){
            console.log('Error in loadAllGiftCards: ', error);
        }
    }

    useEffect(() => {
        loadAllGiftCards();
    }, []);



    return(
        <>
        <h1>Giftcards</h1>

        <li className="grid grid-cols-6 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Value</span>
            <span>Expiration date</span>
            <span>Order</span>
            <span>User</span>
            <span>Redeemed</span>
        </li>

        <ul>
            {giftCards.map((giftCard) => (
                <GiftCardRow
                    key={giftCard.id}
                    giftCard={giftCard}
                />
            ))}



        </ul>

        </>
    );

}

export default GiftcardsAdmin;