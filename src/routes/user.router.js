const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')

const userRouter = express.Router();

userRouter.route('/')
    //.get(getAll)    
     .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/login')
    .post(login);

userRouter.route('/:id')
    //.get(getOne)     
        .get(verifyJWT, getOne)
    //.delete(remove)  
         .delete(verifyJWT, remove)
    //.put(update);    
        .put(verifyJWT, update);

module.exports = userRouter;