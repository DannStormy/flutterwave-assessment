import Joi from 'joi';

export const addAccountSchema = Joi.object({
  name: Joi.string().required(),
  dob: Joi.string().required(),
  account_type: Joi.string().valid('savings', 'checking').required(), //more account types if needed
  initial_balance: Joi.number().positive().required()
});
