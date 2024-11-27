import bcrypt from 'bcrypt';
import User from '../models/User.model.js';

// Hash de la contraseña
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Verificar la contraseña
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
