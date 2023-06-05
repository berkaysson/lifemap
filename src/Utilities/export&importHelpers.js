import { exportDB } from "dexie-export-import";
import Dexie from "dexie";

export const exportHandler = async (db) => {
  try {
    const blob = await exportDB(db, { prettyJson: true });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lifemap-data.json";
    link.click();
  } catch (error) {
    console.error("Failed to export database:", error);
  }
};

export const importHandler = async (db, blob) => {
  try {
    await db.delete();
    db = await Dexie.import(blob);
    console.log("Imported data successfully!");
  } catch (error) {
    console.error("Failed to import data:", error);
  }
};
