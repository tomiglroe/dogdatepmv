'use strict';

const express = require('express');
const follow = require('../controllers/follows/follow');
const unFollow = require('../controllers/follows/unFollow');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/follow', md_auth.ensureAuth, follow);
api.delete('/follow/:id', md_auth.ensureAuth, unFollow);

module.exports = api;