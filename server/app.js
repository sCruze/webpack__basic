require('dotenv').config()

// Импортируем метод для работы с путями в node
const path = require('path')

// Плагин для работы со статическими файлами
const static = require('koa-static')

// Передаем в переменную, все из koa
const Koa = require('koa')

// Передаем в переменную новый экземпляр Koa
const app = new Koa()

// Экспортируем роуты
const router = require('./routes')

// Прописываем модули, которые будем использовать в приложении
app
    .use(static(path.join(__dirname, '../public/dist')))
    .use(router.routes())
    .use(router.allowedMethods())

// Экспортируем app для работы с ним в друших местах приложения
module.exports = app

