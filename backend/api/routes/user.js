'use strict';

const express = require('express');

const pruebas = require('../controllers/user/pruebas');
const registerUser = require('../controllers/user/register');
const loginUser = require('../controllers/user/login');
const getUser = require('../controllers/user/getuser');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');

//Ruta de pruebas
api.get('/pruebas', md_auth.ensureAuth, pruebas);

//Rutas
api.post('/register', registerUser);
api.post('/login', loginUser);
api.get('/user/:id', md_auth.ensureAuth, getUser)

module.exports = api;