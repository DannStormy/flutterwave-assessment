import { Router } from 'express';
import ROUTES from './constants';
import AccountController from '../controllers/accounts';
import validateRequestBody, { catchInternalServerError } from '../middlewares';
import * as validators from '../validators';

const accountRouter = Router();

accountRouter.post(
  ROUTES.ADD_ACCOUNT,
  validateRequestBody(validators.addAccountSchema, 'payload'),
  catchInternalServerError(AccountController.createAccount)
);

accountRouter.get(
  ROUTES.GET_SINGLE_ACCOUNT,
  validateRequestBody(validators.getAccountSchema, 'params'),
  catchInternalServerError(AccountController.fetchSingleAccount)
);

accountRouter.get(
  ROUTES.GET_ALL_ACCOUNTS,
  catchInternalServerError(AccountController.fetchAllAccounts)
);

export default accountRouter;
