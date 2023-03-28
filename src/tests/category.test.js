const request = require('supertest');
const app = require('../app');
const Category = require ('../models/Category');
const User = require('../models/User');
require('../models');
//require('../tests/testMigrate')

let categoryId;
let token;

beforeAll(async() => {
    const credentials = {
        email: "test@migrate.com",
        password: "test1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})

test("POST /categories should create a category", async() => {
    const newCategory = { name: "Tech"}
    const res = await request(app)
        .post("/categories").send(newCategory)
        .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
})

test("GET /categories should return all categories", async() => {
    const res = await request(app).get("/categories");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /categories/:id should update a category", async() => {
    const body = {
        name: "Tech Upd"
    }
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
})

test("DELETE /categories/:id should delete a category", async() => {
    const res = await request(app)
        .delete(`/categories/${categoryId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
 