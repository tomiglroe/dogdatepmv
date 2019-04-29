'use strict';

const path = require('path');
const fs = require('fs');
const moment = require('moment');
const mongoosePaginate = require('mongoose-pagination');

const Publication = require('../../models/publication');
const User = require('../../models/user');
const Follow = require('../../models/follow');

function getPublications(req, res) {

  let page = 1;

  if (req.params.page) {

    page = req.params.page;
  }

  let itemsPerPage = 5;

  //Busco todos los usuarios que sigo y creo un array de objetos con ellos
  Follow.find({ user: req.user.sub }).populate('followed').exec((err, follows) => {

    if (err) return res.status(500).send({ message: 'Error al devolver los usuarios que sigo' });

    let follows_clean = [];

    follows.forEach((follow) => {

      follows_clean.push(follow.followed);
    });

    //Busco publicaciones en el array de objetos de usuarios y las devuelvo ordenadas por fecha y con paginación
    Publication.find({ user: { "$in": follows_clean }}).sort('-created_at').populate('user').paginate(page, itemsPerPage, (err, publications, total) => {

      if (err) return res.status(500).send({ message: 'Error al devolver publicaciones' });

      if (!publications) return res.status(404).send({ message: ' No existen publicaciones'});

      return res.status(200).send({

        total_items: total,
        pages: Math.ceil(total / itemsPerPage),
        page: page,
        publications
      });
    });
  });
}

module.exports = getPublications;