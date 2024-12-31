const ConnectDB = require('./config/db');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const upload = require('./config/multerConfig');
const app = express();
const userRouter = require('./routes/UserRoutes');
const fileRouter = require('./routes/FileRoutes');
const server = http.createServer(app);

// Подключение middleware
ConnectDB();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRouter);
app.use('/api', fileRouter);


// Запуск сервера
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
