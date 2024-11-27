import socketService from '../services/socket.service.js'; // Importar el módulo predeterminado

export class SocketController {
    constructor() {
        // Ya no necesitamos la clase 'SocketService' porque estamos usando el módulo predeterminado
        this.socketService = socketService;  // Usar el servicio directamente
    }

    // Manejar la conexión de un cliente WebSocket
    handleConnection(socket) {
        console.log(`Cliente conectado: ${socket.id}`);

        socket.on('newBid', (data) => {
            console.log(`Nueva oferta recibida en subasta ${data.auctionId}:`, data);
            socket.broadcast.emit('newBid', data); // Emitir a todos los demás clientes
        });

        socket.on('auctionEnded', (data) => {
            console.log(`Subasta ${data.auctionId} finalizada`);
            socket.broadcast.emit('auctionEnded', data); // Emitir a todos los demás clientes
        });

        socket.on('disconnect', () => {
            console.log(`Cliente desconectado: ${socket.id}`);
        });
    }
}
