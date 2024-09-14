import express from 'express';
import axios from 'axios';
import { getCachedQuote } from './services/cache.js';

export const quotesRouter = express.Router();

quotesRouter.get('/', async (_, res) => {
    try {
        const quote = await axios.get('https://stoic-quotes.com/api/quote');
        res.status(200).send(quote.data);
    } catch (error) {
        console.error('\nERROR: Failed to fetch quote\n', error?.data || error);
        res.status(500).send('Error fetching quote');
    }
});

quotesRouter.get('/cached-quote', async (req, res) => {
    try {
        const quote = await getCachedQuote();
        res.status(200).send(quote);
    } catch (error) {
        console.error('\nERROR: Failed to set cache\n', error?.data || error);
        res.status(500).send('Error setting cache');
    }
});