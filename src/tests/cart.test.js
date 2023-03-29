const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
const User = require('../models/User');
//const ProductImage = require('../models/ProductImage.js');
const Cart = require('../models/Cart');
require('../models');

let cartId;
let productId;
let userId;
let token;

beforeAll(async() => {
    const credentials = {
        email: "test@migrate.com",
        password: "pass1234"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
    //userId = res.body.id;
})

test("POST carts should create one cart product", async() => {
    const product = await Product.create({
        title: "prodduct cart test",
        description: "product de prueba de test Cart",
        price: 999        
    })

    const cart = {
        quantity: 99,
        productid: product.id //,
        //userid: userId
    };

    const res = await request(app)
        .post('/carts').send(cart)
        .set('Authorization', `Bearer ${token}`);
        cartId = res.body.id;
    await product.destroy();
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(cart.quantity);
})

test("GET /carts should return all carts", async() => {
    const res = await request(app).get('/carts')
        .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
})

test("PUT /carts/:id should update a cart product", async() => {
    const body = {
        quantity: 88
    }
    const res = await request(app)
        .put(`/carts/${cartId}`)
        .set('Authorization', `Bearer ${token}`)
        .send(body);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
})

test("DELETE /carts/:id should delete a cart product", async() => {
    const res = await request(app)
        .delete(`/carts/${cartId}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
})