import express from 'express';
import { routes } from './routes';

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(routes)

app.addListener(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});