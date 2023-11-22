import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import axios from 'axios';
axios.defaults.baseURL = "https://taller4-ncapas-6f1c8e14c13e.herokuapp.com"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)