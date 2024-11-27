import * as auctionService from '../services/auction.service.js';
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';

// Crear subasta
export const createAuction = async (req, res) => {
  try {
    const { email, password, ...auctionData } = req.body;

    // Verificar que el usuario esté autenticado
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear la subasta
    const auction = await auctionService.createAuction(user._id, auctionData);
    res.status(201).json({ message: 'Subasta creada con éxito', auction });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la subasta', error });
  }
};

// Finalizar subasta
export const finalizeAuction = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { winnerOfferId, email, password } = req.body;

    // Verificar que el usuario esté autenticado
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Finalizar la subasta
    const result = await auctionService.finalizeAuction(user._id, auctionId, winnerOfferId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al finalizar la subasta', error });
  }
};

// Obtener subastas activas
export const getActiveAuctions = async (req, res) => {
  try {
    const auctions = await auctionService.getActiveAuctions();
    res.status(200).json(auctions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las subastas activas', error });
  }
};

// Hacer una oferta
export const placeBid = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const { characterId, email, password } = req.body;

    // Verificar que el usuario esté autenticado
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Realizar la oferta
    const result = await auctionService.placeBid(user._id, auctionId, characterId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error al realizar la oferta', error });
  }
};

// Obtener subasta por ID
export const getAuctionById = async (req, res) => {
  try {
    const { auctionId } = req.params;
    const auction = await auctionService.getAuctionById(auctionId);
    res.status(200).json(auction);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la subasta', error });
  }
};
