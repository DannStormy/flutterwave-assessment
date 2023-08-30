import { Router } from 'express';
import ROUTES from './constants';
import AccountController from '../controllers/accounts';
import validateRequestBody, { catchInternalServerError } from '../middlewares';
import * as validators from '../validators';

const accountRouter = Router();

accountRouter.post(
  ROUTES.ADD_ACCOUNT,
  validateRequestBody(validators.addAccountSchema, 'payload'),
  catchInternalServerError(AccountController.fetchProfile)
);


export default accountRouter;
