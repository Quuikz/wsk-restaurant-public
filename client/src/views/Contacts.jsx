const Contacts = () => {

        

    return(
        <>
        <div className="bg-orange-50">

        
        {/* Page content */}
        <h1
            className="text-center font-bold text-5xl mt-5 mb-5 p-4"
            >Yhteystiedot</h1>
        <div
            className="flex flex-col md:flex-row gap-8 p-6"
            >
                

            {/* Left side - Map */}
            <div className="w-full md:w-1/2">
                <img 
                    src="https://placehold.co/600x400"
                    className="w-full h-auto rounded-lg shadow"
                
                    />
            </div>

            {/* Right side - Restaurant info */}
            <div
                className="w-full md:w-1/2 flex flex-col gap-6 ">

                {/* Right side - (Left/top) - Restaurant contacts */}
                <div className="p-4 bg-gray-100 rounded-lg shadow bg-orange-100">
                    <h3
                        className="text-xl font-semibold mb-2"
                        >Yhteystiedot</h3>
                        
                    <div
                        className="text-lg font-medium">
                        <p>Osoite: IhanOikeaOsoite</p>
                        <p>Puhelinnumero: IhanOikeaPuheli</p>
                        <p>Sähköposti: IhanOikeaSähköposti</p>
                    </div>

                </div>

                {/* Right side - (right/bottom) - Restaurant - opening hours */}
                <div className="p-4 bg-gray-100 rounded-lg shadow bg-orange-100">
                    <h3 
                        className="text-xl font-semibold mb-2"
                        >Aukioloajat</h3>

                    <div 
                        className="text-lg font-medium">
                        <p>MA - PE: 8-17</p>
                        <p>LA: 9-16</p>
                        <p>SU: Kiinni</p>
                    </div>
                    <div className="text-lg font-medium">
                        <p>Sää Helsinki: Sateinen 4°C</p>
                    </div>
                    <div className="text-lg font-medium">
                        <p>Terassi: Auki / Kiinni</p>
                    </div>

                </div>


            </div>

        </div>
        </div>
        
        </>
    );

}

export default Contacts;