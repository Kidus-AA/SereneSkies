import express from 'express';
import { getCachedQuote } from '../services/cache.js';

export const quotesRouter = express.Router();

quotesRouter.get('/', async (_, res) => {
    try {
        const quote = await getCachedQuote();
        res.status(200).send(quote);
    } catch (error) {
        console.error('\nERROR: Failed to fetch quote\n', error?.data || error);
        res.status(500).send('Error fetching quote');
    }
});