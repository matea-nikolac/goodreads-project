import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import App from './App.js'
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(<App />)