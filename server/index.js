require('dotenv').config()

const consola = require('consola')

const app = require('./app')

// Импортируем PORT из файла config.js
const PORT = require('../lib/config').PORT

// Запуск асинхронной функции, которая запускает сервер
async function startApp(PORT) {
    // Если ошибок не обнаружено, происходит запуске сервера на порту=PORT
    try {
        // В метод listen, передаем аргумент функции PORT, для запуска сервера на данном порту
        app.listen(PORT)
        // В плагин consola, передаем сообщение, которое будет показано в терминале среды разработки
        consola.ready({
            message: `Server has been started on port http://localhost:${PORT}`,
            badge: true
        })
        // Если произошла ошибка
    } catch (e) {
        consola.error(new Error(e))
    }
}

// Вызываем функцию
startApp(PORT)
