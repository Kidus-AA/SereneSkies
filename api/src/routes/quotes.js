import express from 'express';
import axios from 'axios';

export const quotesRouter = express.Router();

quotesRouter.get('/', async (_, _) => {
    const quote = await axios.get('https://stoic-quotes.com/api/quote');
    return quote;
});