import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import BaseRouter from './routes/Base';
import cors from 'cors';


require('./passport-config.ts');

// Init express
const app = express();

// Add middleware/settings/routes to express.
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(BaseRouter.path, BaseRouter.router);

// Export express instance
export default app;
