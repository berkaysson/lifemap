import React from "react";
import { createRoot } from "react-dom/client";

import Dexie from "dexie";

import "./index.css";

import App from "./App";

import categoryData from "./Data/categoryData.json";

const STORES = ["2020", "2021", "2022", "2023", "2024", "2025"];
const DB_VERSION = 1;
const DB_NAME = "lifemap";

// Open the database
const openDB = async () => {
  const exists = await Dexie.exists(DB_NAME);

  if(!exists){
    const db = new Dexie(DB_NAME);

    db.version(DB_VERSION).stores({
      ...STORES.reduce((acc, store) => ({ ...acc, [store]: "date" }), {}),
      Categories: "id",
    });
  
    await db.open();
  
    await db.Categories.bulkPut(
      Object.values(categoryData).map((category) => ({
        id: category.id,
        name: category.name,
        subCategories: category.subCategories,
      }))
    );
  
    return db;
  }
  else{
    const db = new Dexie(DB_NAME);
    await db.open();

    return db;
  }
};

// Render the app inside a root element
const rootElement = document.getElementById("root");

openDB()
  .then((db) => {
    createRoot(rootElement).render(
      <React.StrictMode>
        <App db={db} STORES={STORES} />
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to open database:", error);
  });
