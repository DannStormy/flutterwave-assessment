import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import ROUTES from '../app/routes/constant.route';

const expressConfig = (app) => {
  let accessLogStream, logger;

  logger = loggerInit();

  global.logger = logger;
  logger.info('Application starting...');
  logger.debug("Overriding 'Express' logger");

  app.use(morgan('combined', { stream: accessLogStream }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // Use helmet to secure Express headers
  app.use(helmet());
  app.disable('x-powered-by');

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  // handle every valid request i.e request to api/v1
  app.use(config.API_VERSION_ONE_URL, versionOneRouter);

  // reject all unknown routes (routes not directed to api/v1)
  app.all(ROUTES.WILD_CARD, invalidRoute);

  // development error handler
  // will print stacktrace
  app.use((err, req, res, next) =>
    res.status(err.status || 500).json({
      message: err.message,
      error: err,
    })
  );

  // production error handler
  // remove stacktrace
  app.use((err, req, res, next) =>
    res.status(err.status || 500).json({ message: err.message })
  );
  // app.use(errorMiddleware)
};

export default expressConfig;
