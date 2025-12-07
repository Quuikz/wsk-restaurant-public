"use strict";

import { getHslData } from "../models/hsl-model.js";

const getHslData = (req, res) => {
  console.log("getHsl in hsl-controller");

  getHslData().then(
    (result) => {
      if (result) {
        res.json(result);
      } else {
        console.log("no HSL data found");
        res.status(200).send("no HSL data found");
      }
    },

    (result) => {
      console.log("error in getHsl in hsl-controller");
      console.log(result);
      res.sendStatus(500);
    }
  );
};

export { getHsl };
