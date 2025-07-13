import cors from 'cors';
import express, { urlencoded } from 'express';
import morgan from 'morgan';
import contactsRoutes from '../src/api/contactsRouter.mjs';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contacts', contactsRoutes);

app.use('*', (req, res) => {
  res.status(404).send('<h1>Route is not found</h1>');
});

export default app;
