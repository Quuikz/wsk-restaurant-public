import React, {useEffect, useState} from 'react';

// CORS issue with Digitransit API, cannot fetch data
const DeparturesWidget = ({lat, lon, radius = 500}) => {
  const [stops, setStops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const endpoint =
      'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

    const query = `
      {
        stopsByRadius(lat: ${lat}, lon: ${lon}, radius: ${radius}) {
          edges {
            node {
              stop {
                id
                name
                lat
                lon
                stoptimesWithoutPatterns(numberOfDepartures: 5) {
                  scheduledDeparture
                  realtimeDeparture
                  realtime
                  serviceDay
                  headsign
                  trip {
                    route {
                      shortName
                    }
                  }
                }
              }
              distance
            }
          }
        }
      }
    `;

    setLoading(true);
    setError(null);

    fetch(endpoint, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query}),
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Verkkovirhe');
        return res.json();
      })
      .then((json) => {
        const edges = json?.data?.stopsByRadius?.edges || [];
        // Mapataan pysäkit ja niiden lähdöt
        const mapped = edges.map((e) => {
          const stop = e.node.stop;
          const departures = (stop.stoptimesWithoutPatterns || []).map((st) => {
            // serviceDay = unix epoch (seconds at 00:00), scheduledDeparture = seconds from midnight
            const departTs = (st.serviceDay + st.scheduledDeparture) * 1000;
            return {
              time: new Date(departTs),
              headsign: st.headsign,
              route: st.trip?.route?.shortName || '',
              realtime: st.realtime,
            };
          });
          return {
            id: stop.id,
            name: stop.name,
            distance: e.node.distance,
            departures,
          };
        });
        setStops(mapped);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err.message || 'Virhe haussa');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [lat, lon, radius]);

  if (loading) return <div className="p-4">Ladataan lähtöjä…</div>;
  if (error) return <div className="p-4 text-red-600">Virhe: {error}</div>;
  if (!stops.length) return <div className="p-4">Ei pysäkkejä lähellä.</div>;

  // Näytetään lähin pysäkki (ensimmäinen listassa)
  const nearest = stops[0];

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h4 className="font-semibold mb-2">Lähin pysäkki: {nearest.name}</h4>
      <ul className="text-sm space-y-2">
        {nearest.departures.length === 0 && <li>Ei lähdöistäietoja</li>}
        {nearest.departures.map((d, i) => (
          <li key={i} className="flex justify-between">
            <span>
              <strong>{d.route}</strong> → {d.headsign}
            </span>
            <span className="ml-4">
              {d.time.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              {d.realtime ? (
                <span className="text-xs text-green-600">rt</span>
              ) : (
                ''
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeparturesWidget;
