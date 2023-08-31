import moment from 'moment';

export default function generateAccountNumber(bankCode, branchCode) {
  //bank code and branch code are 2-digit
  const randMiddleNumbers = Math.floor(Math.random() * 900000) + 100000; // Generate a 6-digit random number
  logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
        Info: successfully generated account number ::helpers.index.js`);
  return `${bankCode}${randMiddleNumbers}${branchCode}`;
}

export function loggingInfo(message, filePath) {
  logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
  Info: ${message} in ${filePath}`);
}

export function loggingError(message, fileExtention) {
  logger.error(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
  Error: ${message} ${fileExtention}`);
}
