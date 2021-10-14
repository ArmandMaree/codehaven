import SocketHandler from '../socket-handler';

const sendFeedCommand = (feederId: number, duration: number) => {
  return SocketHandler.sendMesageToClient(feederId, { duration });
};

// eslint-disable-next-line import/prefer-default-export
export { sendFeedCommand };
