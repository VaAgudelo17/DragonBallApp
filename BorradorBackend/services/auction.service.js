import * as auctionRepository from '../repositories/auction.repository.js';

// Crear subasta
export const createAuction = async (userId, auctionData) => {
  // Lógica de negocio para crear la subasta
  auctionData.userId = userId;  // Asignar el ID del usuario autenticado
  return await auctionRepository.createAuction(auctionData);
};

// Finalizar subasta
export const finalizeAuction = async (userId, auctionId, winnerOfferId) => {
  // Lógica de negocio para finalizar la subasta
  return await auctionRepository.finalizeAuction(auctionId, winnerOfferId, userId);
};

// Obtener subastas activas
export const getActiveAuctions = async () => {
  return await auctionRepository.getActiveAuctions();
};

// Hacer una oferta
export const placeBid = async (userId, auctionId, characterId) => {
  // Lógica de negocio para realizar la oferta
  return await auctionRepository.placeBid(auctionId, characterId, userId);
};

// Obtener subasta por ID
export const getAuctionById = async (auctionId) => {
  return await auctionRepository.getAuctionById(auctionId);
};
