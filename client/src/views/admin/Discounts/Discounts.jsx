import { useEffect, useState } from "react";
import { useDiscounts } from "../../../hooks/admin/apiHooks"
import DiscountsRow from "./DiscountsRow";

/**
 * Admin component for viewing discounts.
 */
const DiscountsAdmin = () => {

    const { getAllDiscounts } = useDiscounts();
    const [discounts, setDiscounts] = useState([]);


    const loadAllDiscounts = async () => {
        const token = localStorage.getItem('token');
        try{
            const discountsData = await getAllDiscounts(token);
            setDiscounts(discountsData);
        }
        catch(error){
            console.log('Error loading all discounts data: ', error.message);
        }
    }

    useEffect(() => {
        loadAllDiscounts();
    }, [])



    return(
        <>
        <h1>Giftcards</h1>

        <li className="grid grid-cols-5 gap-4 px-4 py-2 bg-gray-100 font-semibold border-b text-gray-700">
            <span>ID</span>
            <span>Discount</span>
            <span>Discount code</span>
            <span>Start date</span>
            <span>End date</span>
        </li>

        <ul>
            {discounts.map((discount) => (
                <DiscountsRow
                    key={discount.id}
                    discount={discount}
                />
            ))}



        </ul>

        </>
    );

}

export default DiscountsAdmin