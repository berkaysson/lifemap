import { useEffect, useState } from "react";
import { exportDB } from "dexie-export-import";
import moment from "moment";
import Dexie from "dexie";

import activityDataUnitConstructor from "../Data/activityDataUnitConstructor";

import AppFetch from "./AppFetch";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

function App({ db, STORES }) {
  const [isNeedFetchUpdate, setIsNeedFetchUpdate] = useState(false);

  useEffect(() => {
    createMissingDataUnits();
    fetchUpdateHandler(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUpdateHandler = (boolean) => {
    setIsNeedFetchUpdate(boolean);
  };

  const createActivityDataUnit = async (
    date = new Date().toISOString().slice(0, 10)
  ) => {
    const activityDataUnit = await activityDataUnitConstructor(date, db);
    const year = date.slice(0, 4);
    try {
      await db[year].add(activityDataUnit);
      console.log("Activity Data unit added successfully");
    } catch (error) {
      console.error("Error adding activity data unit:", error);
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
        await createActivityDataUnit(date);
      }
      if (!(await db.financialData.get(date)))
        await createFinancialDataUnit(date);
    }
  };

  const getActivityDataUnit = async (dateID) => {
    try {
      const selectedYear = dateID.slice(0, 4).toString();
      const activityDataUnit = await db[selectedYear].get(dateID);
      if (activityDataUnit) {
        console.log("Activity Data unit retrieved successfully");
        return activityDataUnit;
      } else {
        console.error("Acitivty Data unit not found");
        return null;
      }
    } catch (error) {
      console.error("Error getting activity data unit:", error);
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
    const allActivityDataUnits = [];
    try {
      for (const year of STORES) {
        const newDataUnits = await db[year].toArray();
        allActivityDataUnits.push(...newDataUnits);
      }
      console.log("All activity data units retrieved successfully");
      return allActivityDataUnits;
    } catch (error) {
      console.error("Error getting all activity data units:", error);
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

  const updateActivityDataUnit = async (toBeUpdatedActivityData) => {
    try {
      const activityDataUnit = await getActivityDataUnit(
        toBeUpdatedActivityData.date
      );
      console.log("Activty Data unit to be updated retrieved successfully");
      const selectedYear = toBeUpdatedActivityData.date.slice(0, 4).toString();
      const currentValue =
        parseInt(
          activityDataUnit[toBeUpdatedActivityData.category][
            toBeUpdatedActivityData.subCategory
          ]
        ) || 0;
      const newValue = parseInt(toBeUpdatedActivityData.value) || 0;
      const calculatedValue = (
        toBeUpdatedActivityData.formMode === "add"
          ? +currentValue + +newValue
          : +currentValue - +newValue
      ).toString();
      if (
        calculatedValue < 0 &&
        toBeUpdatedActivityData.category !== "expenseCategories"
      ) {
        return alert(
          "Value is negative, it must be bigger than zero, value after change:" +
            calculatedValue
        );
      }
      activityDataUnit[toBeUpdatedActivityData.category][
        toBeUpdatedActivityData.subCategory
      ] = calculatedValue;

      await db[selectedYear].put(activityDataUnit);

      fetchUpdateHandler(true);
      console.log("Activity Data unit updated successfully");
    } catch (error) {
      console.error("Failed to get activity data unit:", error);
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
      fetchUpdateHandler(true);
    } catch (error) {
      console.error("Error getting category data:", error);
    }
  };

  const addFinancialDataUnit = async (toBeUpdatedData) => {
    try {
      const financialDataUnit = await db.financialData.get(
        toBeUpdatedData.date
      );
      if (financialDataUnit) {
        financialDataUnit.financeDatas.push(toBeUpdatedData);
        await db.financialData.put(financialDataUnit);
        console.log("Financial Data unit added successfully");
      }
      fetchUpdateHandler(true);
    } catch (error) {
      console.error("Error getting Financial data:", error);
    }
  };

  const updateFinancialDataUnit = async (
    dateID,
    dataUnitID,
    toBeUpdatedData
  ) => {
    try {
      const financialDataUnit = await db.financialData.get(dateID);
      if (financialDataUnit) {
        const oldDataUnitIndex = financialDataUnit.financeDatas.findIndex(
          (obj) => obj.id === dataUnitID
        );
        if (oldDataUnitIndex !== -1) {
          const oldDataUnit = financialDataUnit.financeDatas[oldDataUnitIndex];
          const updatedDataUnit = { ...oldDataUnit, ...toBeUpdatedData };
          financialDataUnit.financeDatas[oldDataUnitIndex] = updatedDataUnit;
          await db.financialData.put(financialDataUnit);
          console.log("Financial Data unit updated successfully");
        }
      }
      fetchUpdateHandler(true);
    } catch (error) {
      console.error("Error updating Financial data:", error);
    }
  };

  const deleteFinancialDataUnit = async (dateID, dataUnitID) => {
    try {
      const financialDataUnit = await db.financialData.get(dateID);
      if (financialDataUnit) {
        financialDataUnit.financeDatas = financialDataUnit.financeDatas.filter(
          (obj) => obj.id !== dataUnitID
        );
        await db.financialData.put(financialDataUnit);
        console.log("Financial Data unit deleted successfully");
      }
      fetchUpdateHandler(true);
    } catch (error) {
      console.error("Error deleting Financial data:", error);
    }
  };

  const deleteSubCategory = async (categoryName, categoryID, subCategory) => {
    const allActivityDataUnits = await getAllActivityDataUnits();
    if (
      allActivityDataUnits.some(
        (activityDataUnit) => activityDataUnit[categoryName]?.[subCategory] > 0
      )
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
      fetchUpdateHandler(true);
    } catch (error) {
      console.error("Error getting category data:", error);
    }
  };

  const addTaskDataUnit = async (taskUnit) => {
    try {
      await db.tasksData.put({...taskUnit, fulfilled:false});
      fetchUpdateHandler(true);
      console.log("Task unit added successfully");
    } catch (error) {
      console.error("Error to create task unit:", error);
    }
  };

  const editTaskDataUnitFulfilled = async (isFulfilled, dataID) => {
    try{
      console.log(isFulfilled, dataID);
      const taskDataUnit = await db.tasksData.get(dataID);
      taskDataUnit.fulfilled = isFulfilled;
      await db.tasksData.put(taskDataUnit);
      console.log("Task unit editted successfully");
    }
    catch(error){
      console.error("Error to edit task unit:", error);
    }
  }

  const deleteTaskDataUnit = async (dataID) => {
    try {
      if(await db.tasksData.get(dataID)){
        await db.tasksData.delete(dataID);
      }
      else{
        console.log("Can't find the task data unit");
      }
      fetchUpdateHandler(true);
      console.log("Task Units deleted succesfully");
    } catch (error) {
      console.error("Error to deleting task unit: ", error);
    }
  }

  const getAllTaskDataUnits = async () => {
    try {
      const allTaskDataUnits = await db.tasksData.toArray();
      return allTaskDataUnits;
    } catch (error) {
      console.error("Error to fetting all task units: ", error);
    }
  };

  const addHabitDataUnit = async (habitUnit) => {
    try {
      await db.habitsData.put({...habitUnit, fulfilled:false});
      fetchUpdateHandler(true);
      console.log("Habit unit added successfully");
    } catch (error) {
      console.log("Error to create Habit unit:", error);
    }
  };

  const deleteHabitDataUnit = async (dataID) => {
    try {
      if(await db.habitsData.get(dataID)){
        await db.habitsData.delete(dataID);
      }
      else{
        console.log("Can't find the Habit data unit");
      }
      fetchUpdateHandler(true);
      console.log("Habit Units deleted succesfully");
    } catch (error) {
      console.error("Error to deleting Habit unit: ", error);
    }
  }

  const getAllHabitDataUnits = async () => {
    try {
      const allHabitDataUnits = await db.habitsData.toArray();
      return allHabitDataUnits;
    } catch (error) {
      console.error("Error to fetting all task units: ", error);
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
    onGetAllCategories: getAllCategories,
    onGetAllFinancialDataUnits: getAllFinancialDataUnits,
    onGetAllActivityDataUnits: getAllActivityDataUnits,
    onGetActivityDataUnit: getActivityDataUnit,
    onGetAllTaskDataUnits: getAllTaskDataUnits,
    onGetAllHabitDataUnits: getAllHabitDataUnits,
    onFetchUpdate: fetchUpdateHandler,
    onEditTaskDataUnitFulfilled: editTaskDataUnitFulfilled,
    isNeedFetchUpdate: isNeedFetchUpdate,
  };

  const contentProps = {
    onCreateToday: createActivityDataUnit,
    onUpdateActivityDataUnit: updateActivityDataUnit,
    onUpdateCategory: updateCategory,
    onDeleteSubCategory: deleteSubCategory,
    onExport: exportHandler,
    onImport: importHandler,
    onAddFinancialDataUnit: addFinancialDataUnit,
    onDeleteFinancialDataUnit: deleteFinancialDataUnit,
    onUpdateFinancialDataUnit: updateFinancialDataUnit,
    onGetActivityDataUnit: getActivityDataUnit,
    onAddTaskUnit: addTaskDataUnit,
    onAddHabitUnit: addHabitDataUnit,
    onDeleteTaskDataUnit: deleteTaskDataUnit,
    onDeleteHabitDataUnit: deleteHabitDataUnit,
  };

  return (
    <div className="App">
      <AppFetch {...fetchProps} contentProps={contentProps} />
    </div>
  );
}

export default App;
