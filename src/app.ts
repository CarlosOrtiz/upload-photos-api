import express from 'express';
import morgan from 'morgan';
import indexRoutes from './router/index';
import path from 'path';
require('dotenv').config({ path: '.env' })
const app = express();

// Setting
app.set('port', process.env.PORT || 4100);

// Middleware
app.use(morgan('dev'));
app.use(express.json());

// Router
app.use('/v1', indexRoutes)

app.use('uploads', express.static(path.resolve('uploads')));

export default app;