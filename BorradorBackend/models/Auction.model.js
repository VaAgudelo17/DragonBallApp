import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'closed'], default: 'active' }, // Estado de la subasta
  offers: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  winnerOfferId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Oferta ganadora (opcional)
});

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;
