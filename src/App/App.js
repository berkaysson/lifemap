import { useEffect, useState } from "react";
import { exportDB } from "dexie-export-import";
import moment from "moment";

import dataUnitConstructor from "../Data/dataUnitConstructor";
import Dexie from "dexie";
import AppFetch from "./AppFetch";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

function App({ db, STORES }) {
  const [selectedDateDataUnit, setSelectedDateDataUnit] = useState(null);

  useEffect(() => {
    createMissingDataUnits();
    setDataUnit(CURRENT_DATE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDataUnit = async (
    date = new Date().toISOString().slice(0, 10)
  ) => {
    const dataUnit = await dataUnitConstructor(date, db);
    const year = date.slice(0, 4);
    try {
      await db[year].add(dataUnit);
      console.log("Data unit added successfully");
    } catch (error) {
      console.error("Error adding data unit:", error);
    }
  };

  const createFinancialDataUnit = async (
    date = new Date().toISOString().slice(0, 10)
  ) => {
    try {
      await db.financialData.add({ date: date, financeDatas: [] });
    } catch (error) {
      console.error("Error adding Finance data unit:", error);
    }
  };

  const createMissingDataUnits = async () => {
    const creationDate = await db.userData.get("creationDate");

    for (
      let startDate = moment(creationDate.creationDate);
      startDate <= moment(CURRENT_DATE);
      startDate.add(1, "days")
    ) {
      const date = startDate.format("YYYY-MM-DD");
      const year = date.slice(0, 4);
      if (!(await db[year].get(date))) {
        await createDataUnit(date);
      }
      if (!(await db.financialData.get(date)))
        await createFinancialDataUnit(date);
    }
    setSelectedDateDataUnit(() => getDataUnit(CURRENT_DATE));
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
      const dbCategoriesStore = await db.categoriesData.toArray();
      return dbCategoriesStore;
    } catch (error) {
      console.log(`getAllCategories: ${error}`);
    }
  };

  const getAllActivityDataUnits = async () => {
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

  const getAllFinancialDataUnits = async () => {
    try {
      const allFinanceDataUnits = await db.financialData.toArray();
      return allFinanceDataUnits;
    } catch (error) {
      console.error("Error to getting all financial datas:", error);
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
      if (
        calculatedValue < 0 &&
        toBeUpdatedData.category !== "expenseCategories"
      ) {
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
      const categoryData = await db.categoriesData.get(category);
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

        await db.categoriesData.put(categoryData);
      }
    } catch (error) {
      console.error("Error getting category data:", error);
    }
  };

  const addFinancialData = async (toBeUpdatedData) => {
    try {
      const financeData = await db.financialData.get(toBeUpdatedData.date);
      if (financeData) {
        financeData.financeDatas.push(toBeUpdatedData);
        await db.financialData.put(financeData);
        console.log("Data unit added successfully");
      }
    } catch (error) {
      console.error("Error getting finance data:", error);
    }
  };

  const updateFinancialData = async (dateID, dataUnitID, toBeUpdatedData) => {
    try {
      const financeData = await db.financialData.get(dateID);
      if (financeData) {
        const oldDataUnitIndex = financeData.financeDatas.findIndex(
          (obj) => obj.id === dataUnitID
        );
        if (oldDataUnitIndex !== -1) {
          const oldDataUnit = financeData.financeDatas[oldDataUnitIndex];
          const updatedDataUnit = { ...oldDataUnit, ...toBeUpdatedData };
          financeData.financeDatas[oldDataUnitIndex] = updatedDataUnit;
          await db.financialData.put(financeData);
          console.log("Data unit updated successfully");
        }
      }
    } catch (error) {
      console.error("Error updating finance data:", error);
    }
  };

  const deleteFinancialData = async (dateID, dataUnitID) => {
    try {
      const financeData = await db.financialData.get(dateID);
      if (financeData) {
        financeData.financeDatas = financeData.financeDatas.filter(
          (obj) => obj.id !== dataUnitID
        );
        await db.financialData.put(financeData);
        console.log("Data unit deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting finance data:", error);
    }
  };

  const deleteSubCategory = async (categoryName, categoryID, subCategory) => {
    const allDataUnits = await getAllActivityDataUnits();
    if (
      allDataUnits.some((dataUnit) => dataUnit[categoryName]?.[subCategory] > 0)
    ) {
      return alert(`This category has been used before, can not be deleted`);
    }

    try {
      const categoryData = await db.categoriesData.get(categoryID);
      if (categoryData) {
        const subCategories = categoryData.subCategories.filter(
          (s) => s !== subCategory
        );
        await db.categoriesData.update(categoryID, { subCategories });
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

  const fetchProps = {
    onGetAllCategories:getAllCategories,
    onGetAllFinancialUnits:getAllFinancialDataUnits,
    onGetAllActivityUnits:getAllActivityDataUnits,
  };

  const contentProps = {
    onCreateToday: createDataUnit,
    onGetDataByDate: setDataUnit,
    onUpdateData: updateDataUnit,
    selectedDateDataUnit: selectedDateDataUnit,
    onUpdateCategory: updateCategory,
    onDeleteSubCategory: deleteSubCategory,
    onExport: exportHandler,
    onImport: importHandler,
    onAddFinancialData: addFinancialData,
    onDeleteFinancialData: deleteFinancialData,
    onUpdateFinancialData: updateFinancialData,
  }

  return (
    <div className="App">
      <AppFetch {...fetchProps} contentProps={contentProps} />
    </div>
  );
}

export default App;
