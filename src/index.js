import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Registrar el Service Worker si está disponible
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`)
      .then(registration => {
        console.log('✅ ServiceWorker registrado:', registration);
      })
      .catch(error => {
        console.error('❌ Error al registrar ServiceWorker:', error);
      });
  });
}
