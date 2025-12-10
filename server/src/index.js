"use strict";

//set .env file for environmental variables
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

//environmental variables from .env
const hostname = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

//express app from app.js
import app from "./app.js";

//set app to use environmental variables
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(
    `API documentation at https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/docs`
  );
  console.log(
    `PhpMyAdmin at https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/phpmyadmin/`
  );
});
