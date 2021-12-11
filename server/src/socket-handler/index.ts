/* eslint-disable @typescript-eslint/no-unused-vars */
import { Server as HttpServer } from 'http';
import WebSocket from 'ws';
import queryString from 'query-string';
import logger from '../logger';
import AquariumSocketHandler from '../aquarium-manager/socket-handler';

let websocketServer:WebSocket.Server;

const register = async (httpServer: HttpServer) => {
  logger.info('Registering socket handler.');

  websocketServer = new WebSocket.Server({
    noServer: true,
    path: '/websockets',
  });

  httpServer.on('upgrade', (request, socket, head) => {
    logger.info('Upgrading request to websocket.');

    websocketServer.handleUpgrade(request, socket, head, (websocket) => {
      logger.info('Handling websocket upgrade.');
      websocketServer.emit('connection', websocket, request);
    });
  });

  websocketServer.on(
    'connection',
    (websocketConnection, connectionRequest) => {
      logger.info('A device connected via websocket');
      const params = connectionRequest?.url?.split('?')![1]!;
      const connectionParams = queryString.parse(params);

      // NOTE: connectParams are not used here but good to understand how to get
      // to them if you need to pass data with the connection to identify it (e.g., a userId).
      logger.info(connectionParams);

      websocketConnection.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        switch (parsedMessage.event) {
          case 'aquarium-manager-register':
            AquariumSocketHandler.register(websocketConnection, parsedMessage.data);
            break;
          default:
            websocketConnection.send(JSON.stringify({
              event: 'error',
              data: {
                message: 'event property missing from message',
              },
            }));
            break;
        }
      });
    },
  );
};

export default { register };
