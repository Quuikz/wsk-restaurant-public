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
