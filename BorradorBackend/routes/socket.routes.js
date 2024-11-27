import { Router } from 'express';
import { emitEvent } from '../services/socket.service.js';

const router = Router();

// Ruta para emitir eventos a todos los usuarios conectados
router.post('/notify', (req, res) => {
  const { event, data } = req.body;

  // Emitir el evento a través del servicio de WebSocket
  emitEvent(event, data);

  res.status(200).json({ message: 'Evento enviado correctamente' });
});

export default router;
