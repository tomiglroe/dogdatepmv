'use strict';

const express = require('express');
const follow = require('../controllers/follows/follow');
const unFollow = require('../controllers/follows/unFollow');
const getFollowingUsers = require('../controllers/follows/getFollowingUsers');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');

api.post('/follow', md_auth.ensureAuth, follow);
api.delete('/follow/:id', md_auth.ensureAuth, unFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, getFollowingUsers);

module.exports = api;