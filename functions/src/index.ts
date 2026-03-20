import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.use('/', router);

export const api = functions.https.onRequest(app);
