const Weeklist = () => {
  return (
    <>
      <div className=" mx-auto">
        <div className="p-7 pt-20 pb-30 bg-orange-100">
          {/* Page title */}
          <div className="text-center w-full pb-10 ">
            <h2 className="text-3xl font-medium">| Viikko 1 |</h2>
            <p className="mt-2 ">
              Päivät 1-7: Lorem ipsum dolor sit amet consectetur
            </p>
          </div>

          {/* Weekly list */}
          <div className="grid grid-cols-3 gap-4 ">
            {/* Monday */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <div className="px-6">
                <h3 className="text-3xl  mt-2 text-center border-b">
                  Maanantai
                </h3>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <p className="mt-1 font-bold">Grilli spesiaali</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>

                  <p className="mt-1 font-bold">Noutopöytä</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tuesday */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <div className="px-6">
                <h3 className="text-3xl  mt-2 text-center border-b">Tiistai</h3>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <p className="mt-1 font-bold">Grilli spesiaali</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>

                  <p className="mt-1 font-bold">Noutopöytä</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Wednesday */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <div className="px-6">
                <h3 className="text-3xl  mt-2 text-center border-b">
                  Keskiviikko
                </h3>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <p className="mt-1 font-bold">Grilli spesiaali</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>

                  <p className="mt-1 font-bold">Noutopöytä</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Thursday */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <div className="px-6">
                <h3 className="text-3xl  mt-2 text-center border-b">Torstai</h3>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <p className="mt-1 font-bold">Grilli spesiaali</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>

                  <p className="mt-1 font-bold">Noutopöytä</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Friday */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <div className="px-6">
                <h3 className="text-3xl  mt-2 text-center border-b">
                  Perjantai
                </h3>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <p className="mt-1 font-bold">Grilli spesiaali</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>

                  <p className="mt-1 font-bold">Noutopöytä</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Saturday */}
            <div className="border bg-white border-neutral-400 rounded-lg overflow-hidden shadow-lg shadow-neutral-200">
              <div className="px-6">
                <h3 className="text-3xl  mt-2 text-center border-b">
                  Lauantai
                </h3>
                <div className="grid grid-cols-2 gap-4 my-4">
                  <p className="mt-1 font-bold">Grilli spesiaali</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>

                  <p className="mt-1 font-bold">Noutopöytä</p>
                  <ul>
                    <li>Nimi</li>
                    <li>Hinta</li>
                    <li>Allergeenit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 ">
            ← Viime viikko
          </button>
          <button className="mt-4 mb-4 bg-orange-200  px-4 py-2 rounded hover:bg-orange-300 absolute right-7">
            Ensi viikko →
          </button>
        </div>
      </div>
    </>
  );
};

export default Weeklist;
