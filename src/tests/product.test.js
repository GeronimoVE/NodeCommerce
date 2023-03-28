const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const Category = require('../models/Category');
//const User = require('../models/User');
require('../models');

let productId;
let token;

beforeAll(async() => {
    const credentials = {
        email: "test@gmail.com",
        password: "test1234"
    }
    const res = await request(app)
        .post('/users/login').send(credentials);
    token = res.body.token;        
})

test("POST /products should create a product", async() => {
    const newProduct = {
        title: "PC Server",
        description: "Mi nuevo servidor de desarrollo",
        price: 999
    }
    const res = await request(app)
        .post('/products').send(newProduct)
        .set('Authorization', `Bearer ${token}`);
    productId = res.body.id;
        expect(res.status).toBe(201);
    expect(res.body.title).toBe(newProduct.title);
})

test("GET /products should return all products", async() => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("PUT /products/:id should update a product", async() => {
    const body = {
        title: "PC Server Upd"
    }
    const res = await request(app)
        .put(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe(body.title);
})

test("POST /products/:id/images should set products images", async() => {
    const image = await ProductImage.create({url: "urltest", filename: "filetest"});
    const res = await request(app)
        .post(`/products/${productId}/images`)
        .set('Authorization', `Bearer ${token}`)
        .send([image.id]);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test("DELETE /products/:id should delete a product", async() => {
    const res = await request(app)
        .delete(`/products/${productId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})
