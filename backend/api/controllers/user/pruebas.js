'use strict';

const User = require('../../models/user');

function pruebas(req, res) {
    
    console.log(req.body);
    res.status(200).send({message: 'Ruta de pruebas con middleware de autenticación'});
}    

module.exports = pruebas;