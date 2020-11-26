import express from 'express';
import cors from 'cors';
import path from 'path';

import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(3333, () => {
    console.log('show de bola');
});