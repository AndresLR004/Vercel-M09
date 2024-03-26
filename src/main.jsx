import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'


import { BrowserRouter } from 'react-router-dom'
import { Map } from './components/aplicacio/Map'



<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <App />
      
    </BrowserRouter>
)
