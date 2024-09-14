import express from 'express';
import { routes } from './routes/index.js';

const PORT = 3001;
const app = express();

app.use(express.json());
app.use('/api', routes);

app.use('/', (_, res) => {
    res.send('Base path of SereneSkies api, check the documentation for api information');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});