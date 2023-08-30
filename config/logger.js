import winston from 'winston';

winston.emitErrs = true;

const logger = () => {
  let ret;

  ret = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      }),
      new winston.transports.File({
        level: 'info',
        filename: './server.log',
        handleExceptions: true,
        json: false,
        maxsize: 5242880,
        maxFiles: 5,
        colorize: false,
      }),
    ],
    exitOnError: false,
  });

  ret.stream = {
    write: (message, encoding) => {
      logger.info(message);
    },
  };

  return ret;
};

export default logger;
