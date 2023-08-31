import Joi from 'joi';

export const addAccountSchema = Joi.object({
  name: Joi.string().required(),
  dob: Joi.string().required(),
  account_type: Joi.string().valid('savings', 'checking').required(),
  initial_balance: Joi.number().positive().required()
});

export const getAccountSchema = Joi.object({
  account_number: Joi.number().positive().required()
});