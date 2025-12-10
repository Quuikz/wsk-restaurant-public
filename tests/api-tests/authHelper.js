"use strict";

import request from "supertest";
import app from "../../src/app.js";

async function login(username, password) {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ username, password })
    .set("Accept", "application/json");

  // Try several common response shapes for token
  const body = res.body || {};
  const tokenCandidates = [
    body.token,
    body.accessToken,
    body.jwt,
    body.authToken,
    body?.data?.token,
  ];

  let token = tokenCandidates.find(
    (t) => typeof t === "string" && t.length > 0
  );

  if (!token) {
    // fallback: sometimes token is returned as plain text
    if (typeof res.text === "string" && res.text.includes("eyJ")) {
      // crude heuristic to find a JWT inside text
      const m = res.text.match(/(eyJ[\w-_=]+?\.[\w-_=]+?\.[\w-_.+=/-]+)/);
      if (m) token = m[1];
    }
  }

  return token || null;
}

export async function getAdminToken() {
  return await login("admin", "password");
}

export async function getUserToken() {
  return await login("username", "password");
}
