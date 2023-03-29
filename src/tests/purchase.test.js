const request = require("supertest");
const app = require("../app");
const Cart = require("../models/Cart");
require("../models");

let token;
let purcharseId;

beforeAll(async () => {
  const credentials = {
    email: "test@migrate.com",
    password: "pass1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("POST /purchases should move cart to purchase", async () => {
  const cart = await Cart.create({
    quantity: 1,
  });
  const purchase = {
    quantity: cart.quantity
  };
  const res = await request(app)
    .post("/purchases")
    .send(purchase)
    .set("Authorization", `Bearer ${token}`);
  purcharseId = res.body.id;
  await cart.destroy();
  expect(res.status).toBe(200);
});

test("GET/ purchase should return all purchases", async ()=> {
  const res = await request(app).get('/purchases')
    .set("Authorization", `Bearer ${token}`);
  console.log(token);
  expect(res.status).toBe(200);
});
