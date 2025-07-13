import cors from 'cors';
import express, { urlencoded } from 'express';
import morgan from 'morgan';
import contactsRoutes from './contactsRouter.mjs';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contacts', contactsRoutes);

app.use('*', (req, res) => {
  res.send('<h1>Route is not found</h1>');
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});

// This file is now only used for local development.
// The API is handled by /api/contacts.js and /api/index.js for Vercel deployment.
