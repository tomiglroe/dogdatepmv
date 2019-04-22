'use strict';

const User = require('../../models/user');

function updateUser(req, res) {

    const userId = req.params.id;
    const update = req.body;

    //Borro la password
    delete update.password;

    if (userId != req.user.sub) {

        return res.status(500).send({ message: 'No tienes permiso para actualizar datos de usuario' });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {

        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!userUpdated) return res.status(404).send({ message: 'No se puede actualizar el usuario' });

        return res.status(200).send({ user: userUpdated });
    })
}

module.exports = updateUser;