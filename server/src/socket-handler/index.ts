import { Server as HttpServer } from 'http';
import { Server as IoServer, Socket } from 'socket.io';
import logger from '../logger';
import AquariumSocketHandler from '../aquarium-manager/socket-handler';

let io: IoServer;

const register = async (httpServer: HttpServer) => {
  io = new IoServer(httpServer);

  io.on('connection', (socket: Socket) => {
    logger.log(`a user connected ${socket.connected}`);

    io.on('aquarium-manager-register', (data: any) => {
      AquariumSocketHandler.register(socket, data);
    });
  });
};

export default { register };
