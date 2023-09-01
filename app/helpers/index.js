import moment from 'moment';
import crypto from 'crypto';
// generate a random serial number
function generateSerialNumber(length) {
  const bytes = crypto.randomBytes(length / 2);
  return bytes.toString('hex');
}

// Function to calculate the check digit for an account number
function calculateCheckDigit(bankCode, accountSerialNumber) {
  const combinedNumber = bankCode.toString() + accountSerialNumber;
  let total = 0;

  for (let i = 0; i < combinedNumber.length; i++) {
    const digitValue = parseInt(combinedNumber[i]);
    // if even, add to total else double digitValue before adding to total
    if (i % 2 === 0) {
      total += digitValue;
    } else {
      total += digitValue * 2;
    }
  }
  return total % 9;
}

// Function to generate a 10-digit account number
export function generateAccountNumber(bankCode) {
  const accountSerialNumber = generateSerialNumber(9);
  const checkDigit = calculateCheckDigit(bankCode, accountSerialNumber);

  return `${bankCode}${accountSerialNumber}${checkDigit}`;
}

export function loggingInfo(message, filePath) {
  logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
  Info: ${message} in ${filePath}`);
}

export function loggingError(message, fileExtention) {
  logger.error(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
  Error: ${message} ${fileExtention}`);
}
