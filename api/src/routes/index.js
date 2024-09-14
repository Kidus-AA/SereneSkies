import express from 'express';
import { quotesRouter } from './quotes.js';

export const routes = express.Router();

routes.use('/quotes', quotesRouter);