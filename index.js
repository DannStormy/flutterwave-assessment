import express from 'express';
import { loggingInfo } from './app/helpers/index.js';
import expressConfig from './config/express.js';

const port = process.env.PORT || 3000;
const app = express();
expressConfig(app);

app.listen(port);
loggingInfo("Application started on port", port)

export default app;
