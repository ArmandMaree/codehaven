import pino from 'pino';
import expressPino from 'express-pino-logger';

const prettyPrint = process.env.NODE_ENV === 'local';
// eslint-disable-next-line import/no-mutable-exports
let logger: pino.Logger;

if (process.env.NODE_ENV === 'production') {
  logger = pino({ prettyPrint }, pino.destination(`${process.env.LOG_LOCATION}/aquarium-manager.log`));
} else {
  logger = pino({ prettyPrint });
}

export const expressLogger = expressPino({
  logger,
});

export default logger;
