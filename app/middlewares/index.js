import { StatusCodes } from 'http-status-codes';
import moment from 'moment';
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
    const valid = await schema.validateAsync(data);
    req.body = valid;
    logger.info(`[[${moment().format('DD-MMM-YYYY, h:mm:ss')}]
        Info: successfully validated request parameters middleware.index.js`);
    return next();
  } catch (error) {
    const message = error.details[0].message.replace(/["]/gi, '');
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      message: 'Validation error',
      error: message,
    });
  }
};

export const catchInternalServerError = (fn) =>
  function (req, res, ...args) {
    return fn(req, res, ...args).catch((error) => {
      res.status(500).json({
        status: false,
        message:
          'We encountered a problem while processing your request. Please try again',
        errors:
          process.env.NODE_ENV !== 'production'
            ? error.errors || error.message
            : null,
      });
    });
  };

export default validateRequestBody;
