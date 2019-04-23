'use strict';

const User = require('../../models/user');
const Follow = require('../../models/follow');

function getUser(req, res) {

    const userId = req.params.id;

    User.findById(userId, (err, user) => {

        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!user) return res.status(404).send({ message: 'El usuario no existe'});

        //Busco si sigo a ese usuario, ya que si no lo sigo pondré botón en frontend por si quiero seguirlo
        Follow.findOne({ 'user': req.user.sub, 'followed': userId }).exec((err, follow) => {

            if (err) return res.status(500).send({ message: 'Error al comprobar si sigo o me sigue este usuario' });

            return res.status(200).send({ user, follow });
        });
    });
}

module.exports = getUser;