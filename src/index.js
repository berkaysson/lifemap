import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';

const STORES = ['2020', '2021', '2022', '2023'];
const DB_VERSION = 1;
const DB_NAME = 'lifemap';

// Open the database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    // Handle errors
    request.onerror = () => {
      console.error('Database error:', request.error);
      reject(request.error);
    };

    // Handle success
    request.onsuccess = () => {
      const db = request.result;
      console.log('Database opened successfully:', db);
      resolve(db);
    };

    // Handle upgrades
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log('Database upgrade needed:', db);

      // Create object stores for each year
      STORES.forEach((storeName) => {
        const store = db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });

        // Define the store schema here
      });
    };
  });
};

// Render the app inside a root element
const rootElement = document.getElementById('root');

openDB().then((db) => {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App db={db} />
    </React.StrictMode>
  );
}).catch((error) => {
  console.error('Failed to open database:', error);
});