import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/account';
import generateAccountNumber from '../helpers';
import { errorResponse, okResponse } from '../utils/response';

export default class AccountController {
  static async createAccount(req, res) {
    const { name, dob, account_type, initial_balance } = req.body;

    //recursively generate unique account number
    async function generateUniqueAccountNumber() {
      const newAccountNumber = generateAccountNumber();
      const existingAccount = await AccountService.getSingleAccount(
        newAccountNumber
      );

      if (existingAccount) {
        return generateUniqueAccountNumber();
      }
      return newAccountNumber;
    }

    const uniqueAccountNumber = await generateUniqueAccountNumber();

    const details = await AccountService.insertAccount([
      uniqueAccountNumber,
      name,
      dob,
      account_type,
      initial_balance,
    ]);

    return okResponse({
      res,
      message: 'Account created successfully',
      data: details,
      statusCode: StatusCodes.OK,
      status: 'success',
    });
  }

  static async fetchSingleAccount(req, res) {
    const { account_number } = req.params;
    console.log(typeof account_number, "djjdjd")
    const accountDetails = await AccountService.getSingleAccount(
      account_number
    );

    if (!accountDetails) {
      return errorResponse({
        res,
        status: 'error',
        message: 'Account not found',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    return okResponse({
      res,
      message: 'Account details retrieved successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
      data: accountDetails
    });
  }

  static async fetchAllAccounts(req, res) {
    const accounts = await AccountService.getAllAccounts();
    return okResponse({
      res,
      message: 'Accounts fetched successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
      data: accounts,
    });
  }
}
