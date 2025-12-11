import React, {useEffect, useState} from 'react';
import {useHslStopsCommon} from '../../../hooks/common/apiHooks';

const DeparturesWidget = () => {
  const {getHslStopsByLatLon, getHslStopsDepAndArr} = useHslStopsCommon();
  const [departuresAndArrivals, setDeparturesAndArrivals] = useState([]);

  const secondsToTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const renderDeparturesTable = (departures) => {
    if (!departures || departures.length === 0) {
      return (
        <tr>
          <td colSpan="3" className="text-center">
            No departures available
          </td>
        </tr>
      );
    }

    return departures.map((stop, stopIndex) => {
      const headingTo = stop?.stoptimesWithoutPatterns?.[0]?.headsign || '';
      const firstDeparture = stop?.stoptimesWithoutPatterns?.[0];

      return (
        <tr className=" rounded " key={stopIndex}>
          <td className="p-2">{stop.name}</td>
          <td className="p-2">
            {firstDeparture?.trip?.route?.shortName || '--'}
          </td>
          <td className="p-2">{headingTo}</td>
          <td className="p-2">
            {firstDeparture
              ? secondsToTime(
                  firstDeparture.realtime
                    ? firstDeparture.realtimeDeparture
                    : firstDeparture.scheduledDeparture,
                )
              : '--:--'}
          </td>
        </tr>
      );
    });
  };

  useEffect(() => {
    const getCoordsFromAddress = async (address) => {
      // For simplicity, using fixed coordinates for Kasarminkatu 2, Helsinki
      return {lat: 60.1599, lon: 24.9484, address: address};
    };

    const fetchStops = async () => {
      try {
        // Restaurant address
        const address = 'Kasarminkatu 2, Helsinki';

        const {lat, lon} = await getCoordsFromAddress(address);
        const radius = 300;

        // Fetch HSL stops
        const result = await getHslStopsByLatLon(lat, lon, radius);
        if (result) {
          return result;
        } else {
          return [];
        }
      } catch (error) {
        console.error('Error fetching HSL stops:', error);
        return [];
      }
    };

    const getDepAndArrForStop = async () => {
      const fetchedStops = await fetchStops();

      const results = await Promise.all(
        fetchedStops.map(async (stop) => {
          const result = await getHslStopsDepAndArr(stop.node.stop.gtfsId);
          return result;
        }),
      );
      setDeparturesAndArrivals(results);
      console.log('Departures and arrivals:', results);
    };

    console.log('DeparturesWidget mounted');
    getDepAndArrForStop();
  }, []);

  return (
    <div className="p-4 bg-orange-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Next departures</h3>
      <table className="min-w-full text-left text-lg font-medium">
        <thead>
          <tr className="bg-orange-200 rounded shadow-sm font-bold">
            <th className="p-2">Stop</th>
            <th className="p-2">Line</th>
            <th className="p-2">Heads To</th>
            <th className="p-2">Departure</th>
          </tr>
        </thead>
        <tbody>{renderDeparturesTable(departuresAndArrivals)}</tbody>
      </table>
    </div>
  );
};

export default DeparturesWidget;
