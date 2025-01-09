import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import { ConnectDB } from './config/db.js';
import userRouter from './routes/UserRoutes.js';
import fileRouter from './routes/FileRoutes.js';
import linkRouter from './routes/LinkRoutes.js';

const app = express();
const server = http.createServer(app);

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Роуты
app.use('/api', userRouter);
app.use('/api', fileRouter);
app.use('/api', linkRouter);

// Запуск сервера
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
