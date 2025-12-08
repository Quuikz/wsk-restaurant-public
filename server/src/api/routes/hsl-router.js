//node imports
import express from "express";

//other imports
import { getHsl } from "../controllers/hsl-controller.js";
import formatBodyTypes from "../../middlewares/formatBodyTypes.js";

const hslRouter = express.Router();

//endpoint http://hostname:port/api/hsl/getHsl
hslRouter.post("/getHsl", formatBodyTypes, getHsl);

export default hslRouter;
