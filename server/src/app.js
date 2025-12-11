"use strict";

//node imports
import express from "express";
import cors from "cors";

//other imports
import apiRouter from "./api/api-router.js";

//express app
const app = express();

//express middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//etusivu html http://hostname:port/
app.use("/", express.static("./public"));
//app.use('/images/meals', express.static('./public/images/meals') );

//dokumentaatio http://hostname:port/docs
app.use("/docs", express.static("docs"));

//admin sivu html http://hostname:port/admin
// app.use("/admin", express.static("./public/admin"));

//polku API:lle
app.use("/api", apiRouter);

//export
export default app;
