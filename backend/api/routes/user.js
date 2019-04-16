'use strict';

const express = require('express');
const mongoosePaginate = require('mongoose-pagination');


const pruebas = require('../controllers/user/pruebas');
const registerUser = require('../controllers/user/register');
const loginUser = require('../controllers/user/login');
const getUser = require('../controllers/user/getuser');
const getUsers = require('../controllers/user/getUsers');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');

//Ruta de pruebas
api.get('/pruebas', md_auth.ensureAuth, pruebas);

//Rutas
api.post('/register', registerUser);
api.post('/login', loginUser);
api.get('/user/:id', md_auth.ensureAuth, getUser);
api.get('/users/:page', md_auth.ensureAuth, getUsers);

module.exports = api;