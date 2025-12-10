"use strict";

import request from "supertest";
import app from "../../src/app.js";
import { closePool } from "../../src/database/pool.js";
import { getAdminToken, getUserToken } from "./authHelper.js";

let adminToken = null;
let userToken = null;

beforeAll(async () => {
  adminToken = await getAdminToken();
  userToken = await getUserToken();
});

afterAll(async () => {
  await closePool();
});

// Helper assertion utilities
function expect2xx(res) {
  expect(res.status).toBeGreaterThanOrEqual(200);
  expect(res.status).toBeLessThan(300);
}

describe("API endpoints converted from .http files", () => {
  describe("Auth", () => {
    test("POST /api/auth/login returns token for default users", async () => {
      const resAdmin = await request(app)
        .post("/api/auth/login")
        .send({ username: "admin", password: "password" });
      expect2xx(resAdmin);
      expect(resAdmin.body || resAdmin.text).toBeTruthy();

      const resUser = await request(app)
        .post("/api/auth/login")
        .send({ username: "username", password: "password" });
      expect2xx(resUser);
      expect(resUser.body || resUser.text).toBeTruthy();
    });

    test("GET /api/auth/validate accepts token", async () => {
      if (!userToken) return; // skip if login failed
      const res = await request(app)
        .get("/api/auth/validate")
        .set("Authorization", `Bearer ${userToken}`);
      expect2xx(res);
      expect(res.body).toBeDefined();
    });
  });

  describe("Users", () => {
    test("GET /api/users returns array (admin)", async () => {
      const res = await request(app)
        .get("/api/users/")
        .set("Authorization", `Bearer ${adminToken}`);
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("GET /api/users/:id returns user object when permitted", async () => {
      const res = await request(app)
        .get("/api/users/2")
        .set("Authorization", `Bearer ${userToken}`);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });

    test("POST /api/users (multipart) - creates user (status 2xx)", async () => {
      const res = await request(app)
        .post("/api/users/")
        .field("username", "test_user_from_api_test")
        .field("name", "Test User")
        .field("password", "password")
        .field("role", "user");
      expect2xx(res);
    });
  });

  describe("Meals", () => {
    test("GET /api/meals returns array", async () => {
      const res = await request(app).get("/api/meals/");
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/meals creates a meal (json)", async () => {
      const payload = {
        id: 234,
        name_fi: "suomenkielinen nimi",
        name_en: "english name",
        description_fi: "suomalainen kuvaus tuotteelle",
        description_en: "english description for the item",
        cost: 0.0,
        type: "food",
        image: "public/images/burger.jpg",
      };
      const res = await request(app)
        .post("/api/meals/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });

    test("GET /api/meals/:id returns an object", async () => {
      const res = await request(app).get("/api/meals/24");
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });

  describe("Menus", () => {
    test("GET /api/menus returns array", async () => {
      const res = await request(app).get("/api/menus/");
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/menus (json) creates a menu", async () => {
      const payload = {
        id: 0,
        date: "2025-12-06",
        week: 12,
        special_meal: 12,
        meals: [1, 2, 3],
        image: "placeholder.jpg",
      };
      const res = await request(app)
        .post("/api/menus/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });

  describe("Locations", () => {
    test("GET /api/locations/ returns array", async () => {
      const res = await request(app).get("/api/locations/");
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/locations/ creates a location (admin)", async () => {
      const payload = {
        id: 5,
        name: "name",
        address: "",
        email: "",
        phone: "",
        table_count: 10,
      };
      const res = await request(app)
        .post("/api/locations/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });

  describe("Reservations", () => {
    test("GET /api/reservations/ returns array (admin)", async () => {
      const res = await request(app)
        .get("/api/reservations/")
        .set("Authorization", `Bearer ${adminToken}`);
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/reservations/ creates reservation (user)", async () => {
      const payload = {
        id: 0,
        user: 1,
        order: 1,
        date: "2025-12-06 16:00:00",
        table_customer_count: 1,
        grill_customer_count: 2,
      };
      const res = await request(app)
        .post("/api/reservations/")
        .set("Authorization", `Bearer ${userToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });

  describe("Orders", () => {
    test("GET /api/orders/ returns array (admin only)", async () => {
      const res = await request(app)
        .get("/api/orders/")
        .set("Authorization", `Bearer ${adminToken}`);
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/orders creates an order (user)", async () => {
      const payload = {
        id: 0,
        user: 0,
        cost: 10.5,
        timestamp: "2025-12-06 12:00:00",
        reservations: [1, 2, 3],
        gift_cards: [1],
      };
      const res = await request(app)
        .post("/api/orders/")
        .set("Authorization", `Bearer ${userToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });

  describe("Giftcards", () => {
    test("GET /api/giftcards returns array", async () => {
      const res = await request(app)
        .get("/api/giftcards/")
        .set("Authorization", `Bearer ${adminToken}`);
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/giftcards creates giftcard (admin)", async () => {
      const payload = {
        id: 0,
        value: 15.5,
        expiration_date: "20260101",
        password: "giftcardpassword",
        order: 0,
        user: 0,
      };
      const res = await request(app)
        .post("/api/giftcards/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });

  describe("Discounts", () => {
    test("GET /api/discounts returns array", async () => {
      const res = await request(app)
        .get("/api/discounts/")
        .set("Authorization", `Bearer ${adminToken}`);
      expect2xx(res);
      expect(Array.isArray(res.body)).toBe(true);
    });

    test("POST /api/discounts creates discount (admin)", async () => {
      const payload = {
        id: 5,
        target_meal: 1,
        cost_override: 6.9,
        discount_code: "code",
        date_start: "start",
        date_end: "end",
        message: "cost_override is the discounted cost",
      };
      const res = await request(app)
        .post("/api/discounts/")
        .set("Authorization", `Bearer ${adminToken}`)
        .send(payload);
      expect2xx(res);
      expect(res.body).toBeTruthy();
    });
  });
});
