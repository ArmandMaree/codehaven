import pino from 'pino';
import expressPino from 'express-pino-logger';

const prettyPrint = process.env.NODE_ENV === 'local';
const logger = pino({ prettyPrint });
export const expressLogger = expressPino({
  logger,
});

export default logger;
