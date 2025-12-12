

const AllergenSelector = ({selectedAllergens, setSelectedAllergens}) => {



    /**
   * Function to add or remove a AllergenCode from a list of selected allergen codes.
   * Add the AllergenCode to selectedAllergens if not selected - Removes it if already selected.
   * Filter creates a new array without AllergenCde if already selected.
   * If the allergenCode is not already selected, it is added and new array is created
   *  with previous allergens + new allergen
   */
    const toggleAllergen = (allergenCode) => {
        if(selectedAllergens.includes(allergenCode)){
            setSelectedAllergens(selectedAllergens.filter((c) => c != allergenCode));
        }
        else{
            setSelectedAllergens([...selectedAllergens, allergenCode])
        }
    }

    const allergenOptions = [
    { code: "G", label: "Gluten" },
    { code: "L", label: "Lactose" },
    { code: "M", label: "Milk" },
    { code: "E", label: "Egg" },
    { code: "F", label: "Fish" },
    { code: "C", label: "Crustaceans" },
    { code: "N", label: "Nuts" },
    { code: "S", label: "Soy" },
    { code: "SE", label: "Sesame" },
    { code: "MU", label: "Mustard" },
    { code: "PA", label: "Peanuts" },
    { code: "SU", label: "Sulphites" },
    { code: "CE", label: "Celery" },
  ];


  return (
    <div className="flex flex-col">
      <label className="mb-4 font-medium">Select meals to add:</label>
      <div className="border rounded p-4 max-h-60 overflow-y-auto">
        {allergenOptions.map((allergen) => {
          const isSelected = selectedAllergens.includes(allergen.code);
          return (
            <div
              key={allergen.code}
              onClick={() => toggleAllergen(allergen.code)}
              className={`cursor-pointer p-2 mb-1 rounded transition ${
                isSelected
                  ? 'bg-gray-500 text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
             Code: {allergen.code} (Explanation: {allergen.label})
            </div>
          );
        })}
      </div>
    </div>
  );



}

export default AllergenSelector;