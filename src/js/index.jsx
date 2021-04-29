// Import from jquery
import * as $ from 'jquery'

// react
import React from "react";
import {render} from "react-dom";

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

const App = () => (
    <div>
        <div className="container">
            <h1>Webpack Course</h1>
        </div>

        <hr />

        <div className="logo"></div>

        <hr />

        <pre className="code"></pre>

        <div className="card">
            <h2>SCSS</h2>
        </div>
    </div>
)

render(<App />, document.getElementById('app'))
