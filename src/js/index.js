// Import from jquery
import * as $ from 'jquery'

// babel
import '../babel'

import Post from "@models/Post";

// Импорт png картинки
import WebpackLogo from '../assets/webpack-logo.png'

// Импорт json
import json from '../assets/json.json'

// Импортируем xml
import xml from '../assets/data.xml'

// Импорт csv
import csv from '../assets/data.csv'

// Импортируем стили
import '../styles/index.css'
import '../styles/scss.scss'

// Здесь доступен метод Post, так как этот файл был подключен раньше index.js in index.html
const post = new Post('Webpack Post Title', WebpackLogo)

$('pre').html(post.toString())

console.log('Post to String', post.toString())

console.log('JSON', json)
console.log('XML', xml)
console.log('CSV', csv)
