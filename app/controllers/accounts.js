import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/account';
import generateAccountNumber from '../helpers';
import moment from 'moment';

export default class AccountController {
  static async createAccount(req, res) {
    const { name, dob, account_type, initial_balance } = req.body;

    // won't be hardcoded values
    const bankCode = 12;
    const branchCode = 34;
    const accountNumber = generateAccountNumber(bankCode, branchCode);
    const details = await AccountService.insertAccount([
      accountNumber,
      name,
      dob,
      account_type,
      initial_balance,
    ]);
    logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
        Info: successfully created user account controllers.accounts.js`);

    return res.status(StatusCodes.OK).json({
      message: 'Account created successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
      data: details,
    });
  }

  static async fetchSingleAccount(req, res) {
    const { account_number } = req.params;
    const accountDetails = await AccountService.getSingleAccount(
      account_number
    );

    if (!accountDetails) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: 'error',
        message: 'Account not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return res.status(StatusCodes.OK).json({
      message: 'Account details retrieved successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
      data: accountDetails,
    });
  }

  static async fetchAllAccounts(req, res) {
    const accounts = await AccountService.getAllAccounts();
    return res.status(StatusCodes.OK).json({
      message: 'Accounts fetched successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
      data: accounts,
    });
  }
}
