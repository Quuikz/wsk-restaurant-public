"use strict";

import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const apiKey = process.env.HSL_API_KEY;
const defaultUrl = "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1";

const getHslData = async (query, body) => {
  console.log("server/src/api/models/hsl-model.js - getHslData");
  console.log({ body, query });

  const url = (body && body.url) || defaultUrl;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/graphql",
        "digitransit-subscription-key": apiKey,
      },
      body: query,
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("HSL API returned non-OK status", response.status, text);
      throw new Error(`HSL API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("return HSL data in getHslData");
    return data;
  } catch (error) {
    console.log("error in getHslData in api model");
    console.log(error);
    throw error;
  }
};

export { getHslData };

/*
Get stops by radius example query:
URL: 
https://api.digitransit.fi/routing/v2/hsl/gtfs/v1
Query:
{ stopsByRadius(lat: 60.159603, lon: 24.948437, radius: 300) { edges { node { stop { name lat lon code gtfsId } distance } } } }
*/

/*
Example response:
{
    "data": {
        "stopsByRadius": {
            "edges": [
                {
                    "node": {
                        "stop": {
                            "name": "Neitsytpolku",
                            "lat": 60.158524,
                            "lon": 24.949516,
                            "code": "H0438",
                            "gtfsId": "HSL:1070102"
                        },
                        "distance": 158
                    }
                },
                {
                    "node": {
                        "stop": {
                            "name": "Neitsytpolku",
                            "lat": 60.158524,
                            "lon": 24.949516,
                            "code": "H0438",
                            "gtfsId": "HSL:1070419"
                        },
                        "distance": 158
                    }
                },
                {
                    "node": {
                        "stop": {
                            "name": "Neitsytpolku",
                            "lat": 60.158488,
                            "lon": 24.949809,
                            "code": "H0439",
                            "gtfsId": "HSL:1070420"
                        },
                        "distance": 193
                    }
                },
                {
                    "node": {
                        "stop": {
                            "name": "Neitsytpolku",
                            "lat": 60.158483,
                            "lon": 24.949833,
                            "code": "H0439",
                            "gtfsId": "HSL:1070103"
                        },
                        "distance": 193
                    }
                },
                {
                    "node": {
                        "stop": {
                            "name": "Tarkk´ampujankatu",
                            "lat": 60.161023,
                            "lon": 24.947501,
                            "code": "H0708",
                            "gtfsId": "HSL:1070425"
                        },
                        "distance": 232
                    }
                }
            ]
        }
    }
}
*/

/* Example query to get HSL routes:
query {
  stop1: stop(id: "HSL:1070419") {
    gtfsId
    name
    lat
    lon
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      realtime
      realtimeState
      scheduledDeparture
      realtimeDeparture
      departureDelay
      headsign
      trip {
        route {
          shortName
          mode
        }
      }
    }
  }

  stop2: stop(id: "HSL:1070420") {
    gtfsId
    name
    lat
    lon
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      realtime
      realtimeState
      scheduledDeparture
      realtimeDeparture
      departureDelay
      headsign
      trip {
        route {
          shortName
          mode
        }
      }
    }
  }

  stop3: stop(id: "HSL:1070425") {
    gtfsId
    name
    lat
    lon
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      realtime
      realtimeState
      scheduledDeparture
      realtimeDeparture
      departureDelay
      headsign
      trip {
        route {
          shortName
          mode
        }
      }
    }
  }

  stop4: stop(id: "HSL:1070421") {
    gtfsId
    name
    lat
    lon
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      realtime
      realtimeState
      scheduledDeparture
      realtimeDeparture
      departureDelay
      headsign
      trip {
        route {
          shortName
          mode
        }
      }
    }
  }

  stop5: stop(id: "HSL:1070422") {
    gtfsId
    name
    lat
    lon
    stoptimesWithoutPatterns(numberOfDepartures: 5) {
      realtime
      realtimeState
      scheduledDeparture
      realtimeDeparture
      departureDelay
      headsign
      trip {
        route {
          shortName
          mode
        }
      }
    }
  }
}
*/
/* Rxample response:
{
    "data": {
        "stop1": {
            "gtfsId": "HSL:1070419",
            "name": "Neitsytpolku",
            "lat": 60.158524,
            "lon": 24.949516,
            "stoptimesWithoutPatterns": [
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 70020,
                    "realtimeDeparture": 70020,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 70740,
                    "realtimeDeparture": 70740,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 71460,
                    "realtimeDeparture": 71460,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 72180,
                    "realtimeDeparture": 72180,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 72900,
                    "realtimeDeparture": 72900,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                }
            ]
        },
        "stop2": {
            "gtfsId": "HSL:1070420",
            "name": "Neitsytpolku",
            "lat": 60.158488,
            "lon": 24.949809,
            "stoptimesWithoutPatterns": [
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 70440,
                    "realtimeDeparture": 70417,
                    "departureDelay": -23,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 71160,
                    "realtimeDeparture": 71130,
                    "departureDelay": -30,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 71880,
                    "realtimeDeparture": 71819,
                    "departureDelay": -61,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 72600,
                    "realtimeDeparture": 72600,
                    "departureDelay": 0,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 73260,
                    "realtimeDeparture": 73260,
                    "departureDelay": 0,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                }
            ]
        },
        "stop3": {
            "gtfsId": "HSL:1070425",
            "name": "Tarkk´ampujankatu",
            "lat": 60.161023,
            "lon": 24.947501,
            "stoptimesWithoutPatterns": [
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 69720,
                    "realtimeDeparture": 69906,
                    "departureDelay": 186,
                    "headsign": "Ullanlinna",
                    "trip": {
                        "route": {
                            "shortName": "10",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 70320,
                    "realtimeDeparture": 70300,
                    "departureDelay": -20,
                    "headsign": "Ullanlinna",
                    "trip": {
                        "route": {
                            "shortName": "10",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 70380,
                    "realtimeDeparture": 70380,
                    "departureDelay": 0,
                    "headsign": "Pikku Huopalahti via Lasipalatsi",
                    "trip": {
                        "route": {
                            "shortName": "10",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 70980,
                    "realtimeDeparture": 70980,
                    "departureDelay": 0,
                    "headsign": "Pikku Huopalahti via Lasipalatsi",
                    "trip": {
                        "route": {
                            "shortName": "10",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 70920,
                    "realtimeDeparture": 71326,
                    "departureDelay": 406,
                    "headsign": "Ullanlinna",
                    "trip": {
                        "route": {
                            "shortName": "10",
                            "mode": "TRAM"
                        }
                    }
                }
            ]
        },
        "stop4": {
            "gtfsId": "HSL:1070421",
            "name": "Kapteeninkatu",
            "lat": 60.158253,
            "lon": 24.945096,
            "stoptimesWithoutPatterns": [
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 70080,
                    "realtimeDeparture": 70080,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 70800,
                    "realtimeDeparture": 70800,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 71520,
                    "realtimeDeparture": 71520,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 72240,
                    "realtimeDeparture": 72240,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 72960,
                    "realtimeDeparture": 72960,
                    "departureDelay": 0,
                    "headsign": "Kuusitie via Päärautatieas.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                }
            ]
        },
        "stop5": {
            "gtfsId": "HSL:1070422",
            "name": "Kapteeninkatu",
            "lat": 60.158191,
            "lon": 24.945404,
            "stoptimesWithoutPatterns": [
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 70380,
                    "realtimeDeparture": 70344,
                    "departureDelay": -36,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 71100,
                    "realtimeDeparture": 71069,
                    "departureDelay": -31,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": true,
                    "realtimeState": "UPDATED",
                    "scheduledDeparture": 71820,
                    "realtimeDeparture": 71785,
                    "departureDelay": -35,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 72540,
                    "realtimeDeparture": 72540,
                    "departureDelay": 0,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                },
                {
                    "realtime": false,
                    "realtimeState": "SCHEDULED",
                    "scheduledDeparture": 73200,
                    "realtimeDeparture": 73200,
                    "departureDelay": 0,
                    "headsign": "Olympiaterm.",
                    "trip": {
                        "route": {
                            "shortName": "3",
                            "mode": "TRAM"
                        }
                    }
                }
            ]
        }
    }
}
*/
