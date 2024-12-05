const express = require('express');
const createTables = require('./db/setup');
const pool = require('./db/index');

const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter')

//создаем приложение express
const app = express();
const PORT = process.env.PORT || 5001

//Middleware для парсинга JSON в теле запроса
app.use(express.json());

app.use('/', userRouter, adminRouter, authRouter);

async function initializeApp() {
    try {
        //создание таблицы
        await createTables(pool);

        //запуск сервера
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing app:', error.message);
    }
    
}

//инициализация приложения
initializeApp();