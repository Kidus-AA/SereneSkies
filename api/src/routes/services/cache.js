import axios from 'axios';
import { LRUCache } from 'lru-cache';
import { createHash } from 'crypto';

const options = {
    max: 500,
    maxAge: 604 * 800 * 1000,   // 1 week
};

export const cache = new LRUCache(options);
export const getCachedQuote = async () => {
    try {
        if(cache.size <= 10) {
            await setCache();
        }

        const keysIterator = cache.rentries();
        const cacheEntry = keysIterator.next();

        cache.delete(cacheEntry.value[0]);
        const quote = JSON.parse(cacheEntry.value[1]);
        return quote;
    } catch (error) {
        console.error('\nERROR: Failed to get cache entries\n', error);
        throw new Error('Error getting cache entries')
    }
}

const setCache = async () => {
    try {
        cache.clear();
        for(let i = 0; i < 5; i++) {
            const {data: quotes} = await axios.get('https://stoic-quotes.com/api/quotes?num=100');
            quotes.map(quote => {
                const strinfiedQuote = JSON.stringify(quote);
                const quoteHash = createHash('md5').update(strinfiedQuote).digest('hex');
                cache.set(quoteHash, JSON.stringify(strinfiedQuote));
            });
        }
        console.log(`Cache successfully set. Cache size: ${cache.size}`);
    } catch (error) {
        console.error('\nERROR: Failed to set cache\n', error);
        throw new Error('Error setting cache')
    }
}
setCache();