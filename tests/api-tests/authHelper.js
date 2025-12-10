"use strict";

import request from "supertest";
import app from "../../server/src/app.js";

async function login(username, password) {
  try {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username, password })
      .set("Accept", "application/json");

    return res.body.token;
  } catch (error) {
    console.error("Error during login:", error);
  }
}

export async function getAdminToken() {
  return await login("admin", "password");
}

export async function getUserToken() {
  return await login("username", "password");
}
