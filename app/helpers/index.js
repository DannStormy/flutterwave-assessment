import moment from 'moment';

export default function generateAccountNumber() {
  return Math.floor(Math.random() * 900000000) + 1000000000;
}

export function loggingInfo(message, filePath) {
  logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
  Info: ${message} in ${filePath}`);
}

export function loggingError(message, fileExtention) {
  logger.error(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
  Error: ${message} ${fileExtention}`);
}
