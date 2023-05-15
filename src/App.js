import { useEffect, useState } from "react";
import { exportDB } from "dexie-export-import";

import dataUnitConstructor from "./Data/dataUnitConstructor";
import AppContent from "./Components/AppContent";
import Dexie from "dexie";

function App({ db, STORES }) {
  const [categories, setCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [selectedDateDataUnit, setSelectedDateDataUnit] = useState(null);

  async function fetchCategories() {
    const newCategories = await getAllCategories();
    setCategories(newCategories);
  }

  useEffect(() => {
    setCategoryOptions(() =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
        subCategories: category.subCategories,
      }))
    );
  }, [categories]);

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDataUnit = async () => {
    const dataUnitDate = new Date().toISOString().slice(0, 10);
    const dataUnit = await dataUnitConstructor(dataUnitDate, db);
    const year = dataUnitDate.slice(0, 4);
    try {
      await db[year].add(dataUnit);
      console.log("Data unit added successfully");
    } catch (error) {
      console.error("Error adding data unit:", error);
    }
  };

  const getDataUnit = async (dateID) => {
    try {
      const selectedYear = dateID.slice(0, 4).toString();
      const dataUnit = await db[selectedYear].get(dateID);
      if (dataUnit) {
        console.log("Data unit retrieved successfully");
        return dataUnit;
      } else {
        console.error("Data unit not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting data unit:", error);
      throw error;
    }
  };

  const getAllCategories = async () => {
    try {
      const dbCategoriesStore = await db.Categories.toArray();
      return dbCategoriesStore;
    } catch (error) {
      console.log(`getAllCategories: ${error}`);
    }
  };

  const getAllDataUnits = async () => {
    const allDataUnits = [];
    try {
      for (const year of STORES) {
        const newDataUnits = await db[year].toArray();
        allDataUnits.push(...newDataUnits);
      }
      console.log("All data units retrieved successfully");
      return allDataUnits;
    } catch (error) {
      console.error("Error getting all data units:", error);
      throw error;
    }
  };

  const setDataUnit = async (date) => {
    try {
      const dataUnit = await getDataUnit(date);
      setSelectedDateDataUnit(dataUnit);
      console.log("Data unit assigned successfully");
    } catch (error) {
      console.error("Failed to get data unit:", error);
    }
  };

  const updateDataUnit = async (toBeUpdatedData) => {
    try {
      const dataUnit = await getDataUnit(toBeUpdatedData.date);
      console.log("Data to be updated retrieved successfully");
      console.log(dataUnit);
      const selectedYear = toBeUpdatedData.date.slice(0, 4).toString();
      const currentValue =
        parseInt(
          dataUnit[toBeUpdatedData.category][toBeUpdatedData.subCategory]
        ) || 0;
      const newValue = parseInt(toBeUpdatedData.value) || 0;
      const calculatedValue = (
        toBeUpdatedData.formMode === "add"
          ? +currentValue + +newValue
          : +currentValue - +newValue
      ).toString();
      if (calculatedValue < 0) {
        return alert(
          "Value is negative, it must be bigger than zero, value after change:" +
            calculatedValue
        );
      }
      dataUnit[toBeUpdatedData.category][toBeUpdatedData.subCategory] =
        calculatedValue;

      await db[selectedYear].put(dataUnit);

      if (dataUnit.date === selectedDateDataUnit.date) {
        setSelectedDateDataUnit(dataUnit);
      }
      console.log("Data unit updated successfully");
    } catch (error) {
      console.error("Failed to get data unit:", error);
    }
  };

  const updateCategory = async (category, subCategory) => {
    try {
      const categoryData = await db.Categories.get(category);
      if (categoryData) {
        if (!categoryData.hasOwnProperty("subCategories")) {
          categoryData.subCategories = [subCategory];
        } else {
          if (categoryData.subCategories.includes(subCategory)) {
            alert(`${subCategory} already exists in ${category}`);
            return;
          }
          categoryData.subCategories.push(subCategory);
        }

        await db.Categories.put(categoryData);
        await fetchCategories();
      }
    } catch (error) {
      console.error("Error getting category data:", error);
    }
  };

  const deleteSubCategory = async (categoryName, categoryID, subCategory) => {
    const allDataUnits = await getAllDataUnits();
    if (
      allDataUnits.some((dataUnit) => dataUnit[categoryName]?.[subCategory] > 0)
    ) {
      return alert(`This category has been used before, can not be deleted`);
    }

    try {
      const categoryData = await db.Categories.get(categoryID);
      if (categoryData) {
        const subCategories = categoryData.subCategories.filter(
          (s) => s !== subCategory
        );
        await db.Categories.update(categoryID, { subCategories });
        await fetchCategories();
      }
    } catch (error) {
      console.error("Error getting category data:", error);
    }
  };

  const exportHandler = async () => {
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

  const importHandler = async (blob) => {
    try {
      await db.delete();
      db = await Dexie.import(blob);
      console.log("Imported data successfully!");
    } catch (error) {
      console.error("Failed to import data:", error);
    }
  };

  return (
    <div className="App">
      <AppContent
        onCreateToday={createDataUnit}
        onGetDataByDate={setDataUnit}
        onUpdateData={updateDataUnit}
        selectedDateDataUnit={selectedDateDataUnit}
        onUpdateCategory={updateCategory}
        onDeleteSubCategory={deleteSubCategory}
        categories={categories}
        categoryOptions={categoryOptions}
        onExport={exportHandler}
        onImport={importHandler}
      />
    </div>
  );
}

export default App;
