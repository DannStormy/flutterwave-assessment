import express from 'express';
import { loggingInfo } from './app/utils/logger.helper';
import expressConfig from './config/express';

const port = process.env.PORT || 9000;
const app = express();
expressConfig(app);

app.listen(port);
loggingInfo("", "Application started on port", port)

export default app;
