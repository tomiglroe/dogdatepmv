'use strict';

const express = require('express');
const registerUser = require('../controllers/user/register');

const api = express.Router();

api.post('/register', registerUser);

module.exports = api;