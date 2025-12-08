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
        "Content-Type": "application/json",
        "digitransit-subscription-key": apiKey,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.log("HSL API returned non-OK status", response.status, text);
      throw new Error(`HSL API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log("return HSL data");
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
