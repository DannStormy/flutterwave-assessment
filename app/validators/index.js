import Joi from 'joi';

export const addAccountSchema = Joi.object({
  name: Joi.string().required(),
  dob: Joi.date().max('now').required(),
  account_type: Joi.string().valid('savings', 'checking').required(),
  initial_balance: Joi.number().positive().required()
});
