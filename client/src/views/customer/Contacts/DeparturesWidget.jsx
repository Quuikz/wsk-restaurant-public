import React, {useEffect, useState} from 'react';
import {useHslStopsCommon} from '../../../hooks/common/apiHooks';

const DeparturesWidget = () => {
  const {getHslStopsByLatLon} = useHslStopsCommon();
  const [stops, setStops] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const getCoordsFromAddress = async (address) => {
      // For simplicity, using fixed coordinates for Kasarminkatu 2, Helsinki
      return {lat: 60.159603, lon: 24.948437, address: address};
    };
    const fetchStops = async () => {
      try {
        // Restaurant address
        const address = 'Kasarminkatu 2, Helsinki';

        const {lat, lon} = await getCoordsFromAddress(address);
        const radius = 300;

        // Fetch HSL stops
        const result = await getHslStopsByLatLon(lat, lon, radius);
        if (result && result.stops) {
          setStops(result.stops);
        } else {
          setStops([]);
        }
      } catch (error) {
        console.error('Error fetching HSL stops:', error);
        setStops([]);
      }
    };

    fetchStops();
  }, []);

  return (
    <div className="p-4 bg-orange-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Next departures</h3>

      <ul className="text-lg font-medium space-y-2">
        <li className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
          <span className="font-semibold">Stop name</span>
        </li>

        <li className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
          <span className="font-semibold">Stop name</span>
        </li>

        <li className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
          <span className="font-semibold">Stop name</span>
        </li>
      </ul>
    </div>
  );
};

export default DeparturesWidget;
