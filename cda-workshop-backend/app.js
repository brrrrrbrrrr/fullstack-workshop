// create express app
import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

// import api route

import router from './routes/index.route.js';
app.use(
  cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
  })
);

app.use('/api', router);

export default app;
