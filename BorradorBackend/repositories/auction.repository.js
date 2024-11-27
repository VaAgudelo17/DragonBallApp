import Auction from '../models/Auction.model.js';

export const createAuction = async (auctionData) => {
  const auction = new Auction(auctionData);
  await auction.save();
  return auction;
};

export const finalizeAuction = async (auctionId, winnerOfferId, userId) => {
  const auction = await Auction.findById(auctionId)
    .populate('offers.userId')
    .populate('userId');
  
  if (!auction || auction.userId._id.toString() !== userId.toString()) {
    throw new Error('No autorizado o subasta no encontrada');
  }

  // Lógica para finalizar la subasta, puede incluir el intercambio de personajes.
  auction.status = 'finalized';
  auction.winnerOfferId = winnerOfferId;

  await auction.save();
  return auction;
};

export const getActiveAuctions = async () => {
  return await Auction.find({ endDate: { $gt: new Date() }, status: { $ne: 'finalized' } }).populate('userId');
};

export const placeBid = async (auctionId, characterId, userId) => {
  const auction = await Auction.findById(auctionId);

  if (!auction) {
    throw new Error('Subasta no encontrada');
  }

  auction.offers.push({ userId, characterId, createdAt: new Date() });
  await auction.save();

  return auction;
};

export const getAuctionById = async (auctionId) => {
  return await Auction.findById(auctionId).populate('offers.userId').populate('userId');
};
