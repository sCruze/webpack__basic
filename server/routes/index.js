// Импортируем модуль koa-router
const Router = require('koa-router')
const fs = require('fs')
const path = require('path')

// Передаем в переменную router, новый экземпляр Router
const router = new Router()

// Метод get, вызываем index.html если был get запрос на путь /
router.get('/', async (ctx) => {
    // Передаем статус 200 для корректной работы приложения
    ctx.response.status = 200
    // Передаем в body файл html
    ctx.body = fs.readFileSync(path.resolve(__dirname, '../../public/dist/index.html'), 'utf8')
})


// Экспортируем модуль router, для регистрации его в самом приложении app
module.exports = router
