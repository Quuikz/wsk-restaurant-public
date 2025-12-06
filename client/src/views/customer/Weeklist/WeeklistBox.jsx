const WeeklistBox = ({menuItem}) => {
  return (
    <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
      <div className="px-6">
        <h3 className="text-3xl  mt-2 text-center border-b">
          {/*Change to week day*/}
          ID {menuItem.id}
        </h3>
        <div className="grid grid-cols-2 gap-4 my-4">
          <p className="mt-1 font-bold">Grilli spesiaali</p>
          <ul>
            <li>Nimi - {menuItem.meals[0].name_fi}</li>
            <li>Hinta - {menuItem.meals[0].cost}€</li>
            <li>Tietoa - {menuItem.meals[0].description_fi}</li>
          </ul>

          <p className="mt-1 font-bold">Noutopöytä</p>
          <ul>
            <li>Nimi - {menuItem.meals[1].name_fi}</li>
            <li>Hinta - {menuItem.meals[1].cost}€</li>
            <li>Tietoa - {menuItem.meals[1].description_fi}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeeklistBox;
