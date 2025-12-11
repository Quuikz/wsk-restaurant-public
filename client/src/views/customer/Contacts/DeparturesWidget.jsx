import React, {useEffect, useState} from 'react';
import {useHslStopsCommon} from '../../../hooks/common/apiHooks';
import {useLanguageContext} from '../../../hooks/contextHooks';

/**
 * DeparturesWidget Component
 *
 * Displays real-time public transportation departure information from nearby HSL (Helsinki Region Transport) stops.
 * Fetches stops within a specified radius of the restaurant location and shows the next departures
 * for each stop in a table format. Supports bilingual display (Finnish/English).
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onStopsFetched - Callback function invoked with the fetched stops data
 * @returns {React.ReactElement} A widget displaying departure information in a table
 *
 * @example
 * return <DeparturesWidget onStopsFetched={(stops) => console.log(stops)} />
 */
const DeparturesWidget = ({onStopsFetched}) => {
  const {getHslStopsByLatLon, getHslStopsDepAndArr} = useHslStopsCommon();
  const [departuresAndArrivals, setDeparturesAndArrivals] = useState([]);
  const {finnish} = useLanguageContext();

  /**
   * Converts seconds since midnight to HH:MM time format.
   *
   * @param {number} seconds - Number of seconds since midnight
   * @returns {string} Formatted time string in HH:MM format (e.g., "09:45")
   *
   * @example
   * secondsToTime(35100) // Returns "09:45"
   * secondsToTime(3661)  // Returns "01:01"
   */
  const secondsToTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  /**
   * Renders the departures table rows from the provided departures data.
   * Displays stop name, route number, destination, and departure time.
   * Shows a message if no departures are available.
   *
   * @param {Array<Object>} departures - Array of departure objects containing stop and timing information
   * @returns {React.ReactElement|Array<React.ReactElement>} Table rows with departure data
   */
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
          <td className="p-2">{stop.name.replace('´', "'")}</td>
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

    /**
     * Fetches HSL stops within a specified radius of the restaurant location.
     * Handles errors gracefully and returns an empty array on failure.
     *
     * @async
     * @returns {Promise<Array<Object>>} Array of HSL stop objects with edge/node structure
     * @throws {Error} Logs error to console if fetching stops fails
     *
     * @example
     * const stops = await fetchStops();
     * // Returns [{node: {stop: {gtfsId: "...", name: "..."}}}, ...]
     */
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

    /**
     * Main async function that orchestrates fetching stops and their departure information.
     *
     * Process:
     * 1. Fetches all nearby stops
     * 2. Extracts stop data for map display
     * 3. Calls parent callback with stop data
     * 4. Fetches departure/arrival info for each stop in parallel
     * 5. Updates state with all departure data
     *
     * @async
     * @returns {Promise<void>}
     */
    const getDepartureForStop = async () => {
      const fetchedStops = await fetchStops();

      const stopsForMap = fetchedStops.map((edge) => edge.node.stop);

      onStopsFetched(stopsForMap);

      const results = await Promise.all(
        fetchedStops.map(async (stop) => {
          const result = await getHslStopsDepAndArr(stop.node.stop.gtfsId);
          return result;
        }),
      );
      setDeparturesAndArrivals(results);
    };

    getDepartureForStop();
  }, []);

  return (
    <div className="p-4 bg-orange-100 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">
        {finnish ? 'Seuraavat lähdöt' : 'Next departures'}
      </h3>
      <div className="w-full overflow-x-auto mb-4">
        <table className="min-w-full text-left text-lg font-medium">
          <thead>
            <tr className="bg-orange-200 rounded shadow-sm font-bold">
              <th className="p-2">{finnish ? 'Pysäkki' : 'Stop'}</th>
              <th className="p-2">{finnish ? 'Linja' : 'Line'}</th>
              <th className="p-2">{finnish ? 'Mihin' : 'Heads To'}</th>
              <th className="p-2">{finnish ? 'Lähtöaika' : 'Departure'}</th>
            </tr>
          </thead>
          <tbody>{renderDeparturesTable(departuresAndArrivals)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default DeparturesWidget;
