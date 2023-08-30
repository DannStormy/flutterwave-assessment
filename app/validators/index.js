import Joi from 'joi';

export const addAccountSchema = Joi.object({
  accountHolderName: Joi.string().required(),
  accountHolderDOB: Joi.date().iso().required(),
  accountType: Joi.string().valid('Savings', 'Checking').required(),
  initialBalance: Joi.number().positive().required()
});