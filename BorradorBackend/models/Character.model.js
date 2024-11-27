import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({ // revisar si el modelo coincide con el de la API de dragon ball 
  name: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL de la imagen
  capturedAt: { type: Date, default: Date.now }, // Fecha de captura
  location: {
    lat: { type: Number }, // Latitud
    lng: { type: Number }, // Longitud
  },
  capturedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario que capturó al personaje
  obtainedThrough: { 
    type: String, 
    enum: ['capture', 'trade'], 
    default: 'capture' 
  }, // Método de obtención: "capture" o "trade"
});

const Character = mongoose.model('Character', characterSchema);
export default Character; // Exportación por defectoc