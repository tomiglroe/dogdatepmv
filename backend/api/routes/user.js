'use strict';

const express = require('express');
const registerUser = require('../controllers/user/register');
const loginUser = require('../controllers/user/login');

const api = express.Router();

api.post('/register', registerUser);
api.post('/login', loginUser);

module.exports = api;