'use strict';

const mongoosePaginate = require('mongoose-pagination');

const User = require('../../models/user');

function getUsers (req, res) {

    let identity_user_id = req.user.sub;
    let page = 1;

    if (req.params.page) {

        page = req.params.page;
    }

    let itemsPerPage = 5;

    User.find().sort('_id').paginate(page, itemsPerPage, (err, users, total) => {

        if (err) return res.status(500).send({ message: 'Error en la petición' });

        if (!users) return res.status(404).send({ message: 'No existen usuarios'});

        return res.status(200).send({
            users,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });
}

module.exports = getUsers;