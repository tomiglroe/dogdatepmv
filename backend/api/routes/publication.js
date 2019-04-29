'use strict';

const express = require('express');
const api = express.Router();
const md_auth = require('../middlewares/authenticated');

const multipart = require('connect-multiparty');
const md_upload = multipart({ uploadDir: './uploads/publications' });

const pruebasPublicaciones = require('../controllers/publications/pruebas');
const savePublication = require('../controllers/publications/savePublication');
const getPublications = require('../controllers/publications/getPublications');


api.get('/pruebas-publicaciones', md_auth.ensureAuth, pruebasPublicaciones);
api.post('/publication', md_auth.ensureAuth, savePublication);
api.get('/publications/:page?', md_auth.ensureAuth, getPublications);
// api.get('/publications-user/:user/:page?', md_auth.ensureAuth, PublicationController.getPublicationsUser);
// api.get('/publication/:id', md_auth.ensureAuth, PublicationController.getPublication);
// api.delete('/publication/:id', md_auth.ensureAuth, PublicationController.deletePublication);
// api.post('/upload-image-pub/:id', [md_auth.ensureAuth, md_upload], PublicationController.uploadImage);
// api.get('/get-image-pub/:imageFile', PublicationController.getImageFile);


module.exports = api;