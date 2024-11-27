import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  rankings: {
    captures: { type: Number, default: 0 },
    exchanges: { type: Number, default: 0 },
  },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }], // Lista de personajes del usuario
});

const User = mongoose.model('User', userSchema);
export default User; // Exportación por defecto