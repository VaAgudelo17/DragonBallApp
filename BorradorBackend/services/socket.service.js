import { Server } from 'socket.io';

let io;

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
  });
};

const emitEvent = (event, data) => {
  if (io) {
    io.emit(event, data);
  }
};
const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO no está inicializado. Llama a init primero.');
  }
  return io;
};

export default {
  init,
  emitEvent,
  getIO,
};
