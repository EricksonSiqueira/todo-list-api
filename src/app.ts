import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import { todoRoute } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());

app.use('/todos', todoRoute);

export default app;
