// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';      // Make sure App.tsx is in src/App.tsx
import './index.css';    // Your global Tailwind styles

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Failed to find the root element with id 'root' in your index.html");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);