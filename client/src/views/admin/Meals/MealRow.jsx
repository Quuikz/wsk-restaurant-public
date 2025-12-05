

const MealRow = ({ meal, onModify, onDelete }) => {
    return(
        <>
        <li>
            <p>{`${meal.name_fi} - ${meal.cost}`}</p>

            <button onClick={onModify}>Modify Meal</button>

            <button onClick={onDelete}>Delete Meal</button>
        </li>
        
        </>
    );
}

export default MealRow;