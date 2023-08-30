import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
import { errorResponse } from '../utils/response';

const validateRequestBody = (schema, type) => async (req, res, next) => {
  try {
    const getType = {
      payload: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      file: req.files,
    };
    const data = getType[type];
    const { correlationId } = req;
    const valid = await schema.validateAsync(data);
    req.body = valid;
    logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
        ${correlationId} 
        Info: successfully validates request parameters middleware.validator.helper.js`);
    return next();
  } catch (error) {
    const message = error.details[0].message.replace(/["]/gi, '');
    return errorResponse({
      res,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      message,
      error: message,
    });
  }
};

export const catchInternalServerError = fn => function (req, res, ...args) {
  return fn(req, res, ...args).catch(error => {
    res.status(500).json({
      status: false,
      message: 'We encountered a problem while processing your request. Please try again',
      errors: error.errors || error.message
    });
  });
};

export default validateRequestBody;
