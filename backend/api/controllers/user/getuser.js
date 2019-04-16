'use strict';

const User = require('../../models/user');

function getUser(req, res) {

    const userId = req.params.id;

    User.findById(userId, (err, user) => {

        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!user) return res.status(404).send({ message: 'El usuario no existe'});

        return res.status(200).send({user});
    });
}

module.exports = getUser;