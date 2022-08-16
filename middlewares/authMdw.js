import jwt from 'jsonwebtoken'
import { PRIVATE_KEY, admin } from '../config.js';

export function isAuth(req, res, next) {

  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

  if (!authHeader) {
    return res.status(401).json({
      error: 'Se requiere autenticacion para acceder a este recurso.',
      detalle: 'No se encontró token de autenticación.'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      error: 'Se requiere autenticacion para acceder a este recurso.',
      detalle: 'Formato de token invalido.'
    })
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = decoded.user;
    next();
  });

}

export function isAdmin(req, res, next) {

  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

  if (!authHeader) {
    return res.status(401).json({
      error: 'Se requiere autenticacion para acceder a este recurso.',
      detalle: 'No se encontró token de autenticación.'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      error: 'Se requiere autenticacion para acceder a este recurso.',
      detalle: 'Formato de token invalido.'
    })
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (decoded.user.email != admin) {
      return res.sendStatus(403);
    }

    req.user = decoded.user;
    next();
  });

}