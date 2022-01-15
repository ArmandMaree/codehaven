import WebSocket from 'ws';

const connectedClients = new Map<number, WebSocket.WebSocket>();

const register = async (socket: WebSocket.WebSocket, data: any) => {
  connectedClients.set(data.feederId, socket);
  socket.send(JSON.stringify({
    event: 'message',
    data: {
      message: 'Registered successfully',
    },
  }));
};

const sendMesageToClient = async (feederId: number, data: any) => {
  if (connectedClients.has(feederId)) {
    const socket: WebSocket.WebSocket = connectedClients.get(feederId)!;

    if (!socket) {
      throw new Error(`Socket not connected for feeder with ID: ${feederId}`);
    }

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
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
