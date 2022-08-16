import jwt from 'jsonwebtoken'
import { PRIVATE_KEY } from '../config.js';

export function generateAuthToken(user) {
    const token = jwt.sign({user}, PRIVATE_KEY, { expiresIn: '3000s' });
    return token;
  }
