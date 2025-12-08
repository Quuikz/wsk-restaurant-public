"use strict";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { getHslData } from "./server/src/api/models/hsl-model.js";

async function test() {
  const query = `
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
`;

  try {
    const data = await getHslData(query, null);
    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error during getHslData:", error);
  }
}

test();

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
