import { Router } from 'express';
import { getCharacters, getCharacterById, addCharacter } from '../controllers/character.controller.js';

const router = Router();

// Obtener todos los personajes disponibles
router.get('/', getCharacters);

// Obtener detalles de un personaje por ID
router.get('/:characterId', getCharacterById);

// Agregar un nuevo personaje capturado
router.post('/', addCharacter);  // Eliminar el authMiddleware

export default router;
