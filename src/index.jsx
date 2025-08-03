import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/reset.scss'
import './styles/main.scss'

// При перезагрузке страницы прокручиваем наверх
if (typeof window !== 'undefined') {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0)
  }
}

// Находим корневой элемент и рендерим приложение
const root = createRoot(document.getElementById('root'))
root.render(<App />)
