import { StatusCodes } from 'http-status-codes';
import AccountService from '../services/account';
import generateAccountNumber from '../helpers';
import { okResponse } from '../utils/response';

export default class AccountController {
  static async createAccount(req, res) {
    const { body } = req;

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

    await AccountService.insertAccount([
      uniqueAccountNumber,
      body.name,
      body.dob,
      body.account_type,
      body.initial_balance,
    ]);

    return okResponse({
      res,
      message: 'Account created successfully',
      data: profile,
      statusCode: StatusCodes.OK,
      status: 'success',
    });
  }

  static async fetchSingleAccount(req, res) {
    const { user, file, body, correlationId } = req;
    if (!user?.tag) {
      return errorResponse({
        res,
        status: 'error',
        message: 'invalid user/tag',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    if (user.tag === 'cg') {
      const values = updateProfilePayload(user, file, body, true);
      await AccountService.updateCaregiverProfile(values, correlationId);
      if (body.family_name) {
        await AccountService.updateFamilyName(
          [body.family_name, user.family_id],
          correlationId
        );
      }
      await CaregiverCreationService.updateCaregiverProfileCompletion(
        [user.id],
        correlationId
      );
    }
    if (user.tag === 'cocg') {
      const values = updateProfilePayload(user, file, body, false);
      await AccountService.updateCoCaregiverProfile(values, correlationId);
    }
    await AnalyticsServices.updateOthersCount([1, user.id], correlationId);
    return okResponse({
      res,
      message: 'profile updated successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
    });
  }

  static async fetchAllAccounts(req, res) {
    const {
      body: { permissions },
      params: { co_caregiver_id },
      correlationId,
      user,
    } = req;
    const co_caregiver = await CaregiverCreationService.getCoCaregiver([
      co_caregiver_id,
    ]);
    if (!co_caregiver) {
      return errorResponse({
        res,
        status: 'error',
        message: 'co_caregiver does not exist',
        statusCode: StatusCodes.NOT_FOUND,
      });
    }
    await AccountService.deleteCoCaregiverPermissions(
      [co_caregiver_id, user.family_id],
      correlationId
    );
    await CaregiverCreationService.createCoCareGiverPermissions(
      [co_caregiver_id, permissions, user.family_id],
      correlationId
    );
    await AnalyticsServices.updateOthersCount([1, user.id], correlationId);
    return okResponse({
      res,
      message: 'permissions updated successfully',
      statusCode: StatusCodes.OK,
      status: 'success',
    });
  }
}
