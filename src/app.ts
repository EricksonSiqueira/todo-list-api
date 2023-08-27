import express from 'express';
import { todoRoute } from './routes';

const app = express();

app.use(express.json());

app.use('/todos', todoRoute);

export default app;
