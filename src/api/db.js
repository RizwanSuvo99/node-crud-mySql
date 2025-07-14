/* eslint-disable no-undef */
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();

const db = client.db('contactDB'); // replace with your DB name
export default db;
