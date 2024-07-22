import connect from './src/database/connect.js';
import router from './src/routes/index.js';
import express from 'express';
import cors from 'cors'
import 'dotenv/config'

const app = express();

// Connection DB
connect();
app.use(cors())
app.use(express.json());
app.use(router)

export default app;