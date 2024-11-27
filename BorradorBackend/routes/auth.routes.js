import { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller.js';

const router = Router();

// Rutas de autenticación
router.post('/register', register); // Registrar usuario
router.post('/login', login);       // Iniciar sesión
router.get('/profile', getProfile); // Obtener perfil del usuario autenticado

export default router;
