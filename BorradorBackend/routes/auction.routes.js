import { Router } from 'express';
import { createAuction, finalizeAuction, getActiveAuctions, placeBid, getAuctionById } from '../controllers/auction.controller.js';

const router = Router();

// Crear subasta
router.post('/', createAuction);

// Finalizar subasta
router.post('/finalize/:auctionId', finalizeAuction);

// Obtener subastas activas
router.get('/', getActiveAuctions);

// Hacer una oferta
router.post('/bid/:auctionId', placeBid);

// Obtener subasta por ID
router.get('/:auctionId', getAuctionById);

export default router;
