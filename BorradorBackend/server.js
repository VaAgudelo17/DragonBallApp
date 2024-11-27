import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { connectDB } from './config/db.js';
import socketService from './services/socket.service.js'; // Importación del servicio de WebSocket
import { SocketController } from './controllers/socket.controller.js'; // Importación del controlador de WebSocket
import authRoutes from './routes/auth.routes.js';
import auctionRoutes from './routes/auction.routes.js';
import characterRoutes from './routes/character.routes.js';

dotenv.config();

// Inicialización de Express y servidor HTTP
const app = express();
const server = http.createServer(app);

// Inicializar Socket.IO
socketService.init(server);  // Inicializa el WebSocket
const io = socketService.getIO(); // Obtener la instancia de Socket.IO

// Instanciar el controlador de WebSocket
const socketController = new SocketController();  

// Manejar conexión de clientes
io.on('connection', (socket) => {
  socketController.handleConnection(socket);  // Llamar al método de manejo de conexión
});

// Conexión a la base de datos
connectDB()
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => {
    console.error('Error al conectar la base de datos:', err.message);
    process.exit(1);
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/characters', characterRoutes);

// Manejo de rutas desconocidas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Ocurrió un error en el servidor', error: err.message });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
