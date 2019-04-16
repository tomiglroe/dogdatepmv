'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_dogname_proyecto';


let payload;

function ensureAuth (req, res, next) {

  if (!req.headers.authorization) {

    return res.status(403).send({ message: 'La petición no tiene cabecera de autenticación' });
  }

  const token = req.headers.authorization.replace(/['"]+/g, '');

  try {

    payload = jwt.decode(token, secret);

    if (payload.exp <= moment().unix()) {

      return res.status(401).send({ message: 'El token ha expirado' });
    }

  } catch (ex) {

    return res.status(404).send({ message: 'El token no es válido' });
  }

  req.user = payload;
  next();

}

module.exports = { ensureAuth }