import useWeather from '../../hooks/widgetApiHooks.js';
import DeparturesWidget from './Contacts/DeparturesWidget.jsx';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {useLanguageContext} from '../../hooks/contextHooks.js';

// Custom icon for the marker
const customIcon = L.icon({
  iconUrl: new URL('leaflet/dist/images/marker-icon.png', import.meta.url).href,
  iconRetinaUrl: new URL(
    'leaflet/dist/images/marker-icon-2x.png',
    import.meta.url,
  ).href,
  shadowUrl: new URL('leaflet/dist/images/marker-shadow.png', import.meta.url)
    .href,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Contacts = () => {
  //language
  const {finnish} = useLanguageContext();

  // Restaurant position
  const position = [60.1599, 24.9484];

  // Weather hook
  const {data, loading, error} = useWeather({
    lat: position[0],
    lon: position[1],
    refreshMinutes: 15,
  });

  const weatherData = data?.current_weather;

  const terraceOpen = weatherData?.temperature > 15;

  return (
    <>
      <div className="bg-orange-50 max-w-7xl mx-auto p-7 pt-20 pb-30">
        {/* Page title */}
        <div className="text-center w-full pb-10 ">
          <h2 className="text-3xl font-medium">
            | {finnish ? 'Yhteystiedot' : 'Contact information'} |
          </h2>
          <p className="mt-2 ">
            {finnish
              ? 'Tule paikalle tai ota yhteyttä!'
              : 'Come visit or contact us!'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Left side - Map */}
          <div className="w-full md:w-1/2 z-10">
            {/* Map */}
            <div className="h-full rounded-md overflow-hidden shadow">
              <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={false}
                style={{height: '100%', width: '100%'}}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                  <Popup>Restauranto Kasarmikatu 2</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>

          {/* Right side - Restaurant info */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 ">
            {/* Right side - (Left/top) - Restaurant contacts */}
            <div className="p-4  rounded-lg shadow bg-orange-100">
              {/* !!! Departures Widget NOT WORKING CORS*/}
              {/* <DeparturesWidget lat={60.1599} lon={24.9484} radius={500} /> */}

              <h3 className="text-xl font-semibold mb-2">
                {finnish ? 'Yhteystiedot' : 'Contact information'}
              </h3>

              <div className="text-lg font-medium">
                <p>{finnish ? 'Osoite' : 'Address'}: Kasarmikatu 2</p>
                <p>{finnish ? 'Puhelin' : 'Phone'}: +358 4403025563</p>
                <p>{finnish ? 'Sähköposti' : 'Email'}: Restauranto@mail.com</p>
              </div>
            </div>

            {/* Right side - (right/bottom) - Restaurant - opening hours */}
            <div className="p-4  rounded-lg shadow bg-orange-100">
              <h3 className="text-xl font-semibold mb-2">
                {finnish ? 'Aukioloajat' : 'Opening hours'}
              </h3>

              <div className="text-lg font-medium">
                <p>{finnish ? 'MA - PE: 8-17' : 'MON - FRI: 8-17'}</p>
                <p>{finnish ? 'SAT: 8-17' : 'SAT: 9-16'}</p>
                <p>{finnish ? 'SU: Kiinni' : 'SUN: Closed'}</p>
              </div>
              <div className="text-lg font-medium">
                {/* !!! Check code better */}
                <p>
                  {finnish ? 'Sää, Helsinki:' : 'Weather, Helsinki'}{' '}
                  {weatherData
                    ? `${weatherData.temperature}°C, ${finnish ? 'Tuuli' : 'Wind'}: ${weatherData.windspeed} m/s`
                    : loading
                      ? finnish
                        ? 'Ladataan säätietoja...'
                        : 'Loading weather...'
                      : error
                        ? `Error: ${error}`
                        : finnish
                          ? 'Ei säätietoja saatavilla'
                          : 'No weather available'}
                </p>
              </div>
              <div className="text-lg font-medium">
                {/* !!! Set functionality using temperature and ?weather */}
                <p>
                  {finnish
                    ? 'Terassi on ' +
                      (terraceOpen ? 'auki!' : 'suljettu sään takia.')
                    : 'Terrace is ' +
                      (terraceOpen ? 'open!' : 'closed due to weather.')}
                </p>
              </div>
            </div>

            {/* Right side - (right/bottom) - Closest HSL stops */}
            <DeparturesWidget />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
