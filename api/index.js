// This file is required by Vercel to handle the API as a serverless function
import { createServer } from '@vercel/node';
import app from './contacts.js';

export default createServer(app);
