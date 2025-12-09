import {useState, useEffect} from 'react';

const OPEN_METEO = 'https://api.open-meteo.com/v1/forecast';

const useWeather = ({
  lat = 60.1699,
  lon = 24.9416,
  refreshMinutes = 15,
  currentWeather = true,
  hourly = 'temperature_2m,relative_humidity_2m,wind_speed_10m',
  timezone = 'Europe/Helsinki',
  temperature_unit = 'celsius',
  windspeed_unit = 'ms',
} = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    const normalizeWindspeed = (v) => {
      if (!v) return v;
      return String(v)
        .replace(/[^a-zA-Z0-9]/g, '')
        .toLowerCase();
    };

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const paramsObj = {
          latitude: String(lat),
          longitude: String(lon),
          timezone,
          temperature_unit,
          windspeed_unit: normalizeWindspeed(windspeed_unit),
        };

        if (currentWeather) paramsObj.current_weather = 'true';
        if (hourly) paramsObj.hourly = hourly;

        const params = new URLSearchParams(paramsObj);
        const url = `${OPEN_METEO}?${params.toString()}`;

        const res = await fetch(url, {signal: controller.signal});
        if (!res.ok) {
          let bodyText;
          try {
            bodyText = await res.text();
          } catch (e) {
            bodyText = '<unreadable>';
          }
          throw new Error(`Weather fetch failed (${res.status}): ${bodyText}`);
        }
        const json = await res.json();
        if (!mounted) return;
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('useWeather error:', err);
          setError(err.message || 'Virhe haussa');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(
      fetchWeather,
      (refreshMinutes || 15) * 60 * 1000,
    );

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(interval);
    };
  }, [
    lat,
    lon,
    refreshMinutes,
    currentWeather,
    hourly,
    timezone,
    temperature_unit,
    windspeed_unit,
  ]);

  return {data, loading, error};
};

export default useWeather;
