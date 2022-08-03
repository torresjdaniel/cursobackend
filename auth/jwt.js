import jwt from 'jsonwebtoken'
const PRIVATE_KEY = 'Gerardo<3';

export function generateAuthToken(user) {
    const token = jwt.sign({user}, PRIVATE_KEY, { expiresIn: '3000s' });
    return token;
  }
  
export function isAuth(req, res, next){

    const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

  if (!authHeader) {
    return res.status(401).json({
      error: 'se requiere autenticacion para acceder a este recurso',
      detalle: 'no se encontró token de autenticación'
    })
  }

  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      error: 'se requiere autenticacion para acceder a este recurso',
      detalle: 'formato de token invalido!'
    })
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
        console.log(err);
      return res.status(403).json({
        error: 'not authorized'
      });
    }
 
    const test = decoded.user;
    console.log(test)
    next();
  });
 
}
  