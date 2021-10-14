import SocketIo from 'socket.io';

const connectedClients = new Map<number, SocketIo.Socket>();

const register = async (socket: SocketIo.Socket, data: any) => {
  connectedClients.set(data.feederId, socket);

  // socket.on('aquarium-manager-register', (data: any) => {

  // });
};

const sendMesageToClient = async (feederId: number, data: any) => {
  if (connectedClients.has(feederId)) {
    const socket: SocketIo.Socket = connectedClients.get(feederId)!;

    if (!socket) {
      throw new Error(`Socket not connected for feeder with ID: ${feederId}`);
    }

    if (socket.connected) {
      socket.emit(data);
    } else {
      throw new Error(`Socket not connected for feeder with ID: ${feederId}`);
    }
  } else {
    throw new Error(`Socket not connected for feeder with ID: ${feederId}`);
  }
};

export default {
  register,
  sendMesageToClient,
};
