"use strict";

import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import { getHslData } from "./server/src/api/models/hsl-model.js";

async function test() {
  const query = `
  query {
    stop(id: "HSL:H0438") {
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

    stop2: stop(id: "HSL:H0439") {
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

    stop3: stop(id: "HSL:H0708") {
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
                          "code": "H0438"
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
                          "code": "H0439"
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
                          "code": "H0708"
                      },
                      "distance": 232
                  }
              }
          ]
      }
  }
}
*/
