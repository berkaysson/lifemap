import { useEffect, useState } from "react";
import moment from "moment";
import { formatDate } from "../Utilities/formatDate";
import { exportHandler, importHandler } from "../Utilities/exportAndImport";

import activityDataUnitConstructor from "../Data/activityDataUnitConstructor";

import AppFetch from "./AppFetch";
import { addTaskOrHabitDataUnit, deleteTaskOrHabitDataUnit, getAllTaskOrHabitDataUnits } from "../Utilities/tasksAndHabits";


const CURRENT_DATE = formatDate(new Date());

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
    date = CURRENT_DATE
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
    date = CURRENT_DATE
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
    await addTaskOrHabitDataUnit(db, taskUnit, "task");
    fetchUpdateHandler(true);
  };

  const addHabitDataUnit = async (habitUnit) => {
    await addTaskOrHabitDataUnit(db, habitUnit, "habit");
    fetchUpdateHandler(true);
  };

  const deleteTaskDataUnit = async (dataID) => {
    await deleteTaskOrHabitDataUnit(db, dataID, "task");
    fetchUpdateHandler(true);
  }

  const deleteHabitDataUnit = async (dataID) => {
    await deleteTaskOrHabitDataUnit(db, dataID, "habit");
    fetchUpdateHandler(true);
  }

  const getAllTaskDataUnits = async () => {
    return await getAllTaskOrHabitDataUnits(db, "task");
  };

  const getAllHabitDataUnits = async () => {
    return await getAllTaskOrHabitDataUnits(db, "habit");
  };

  const editTaskDataUnitFulfilled = async (isFulfilled, dataID) => {
    try{
      const taskDataUnit = await db.tasksData.get(dataID);
      taskDataUnit.isFulfilled = isFulfilled;
      await db.tasksData.put(taskDataUnit);
      console.log("Task unit editted successfully");
    }
    catch(error){
      console.error("Error to edit task unit:", error);
    }
  }

  const editTaskDataUnitClosed = async (isClosed, dataID) => {
    try{
      const taskDataUnit = await db.tasksData.get(dataID);
      taskDataUnit.isClosed = isClosed;
      await db.tasksData.put(taskDataUnit);
      console.log("Task unit editted successfully");
    }
    catch(error){
      console.error("Error to edit task unit:", error);
    }
  }

  const editHabitDataUnitFulfilled = async (isFulfilled, dataID) => {
    try{
      const habitDataUnit = await db.habitsData.get(dataID);
      habitDataUnit.isFulfilled = isFulfilled;
      await db.habitsData.put(habitDataUnit);
      console.log("Habit unit editted successfully");
    }
    catch(error){
      console.error("Error to edit Habit unit:", error);
    }
  }

  const editHabitDataUnitClosed = async (isClosed, dataID) => {
    try{
      const habitDataUnit = await db.habitsData.get(dataID);
      habitDataUnit.isClosed = isClosed;
      await db.habitsData.put(habitDataUnit);
      console.log("Habit unit editted successfully");
    }
    catch(error){
      console.error("Error to edit Habit unit:", error);
    }
  }

  const handleExport = async () => {
    await exportHandler(db);
  };
  
  const handleImport = async (blob) => {
    await importHandler(db, blob);
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
    onEditTaskDataUnitClosed: editTaskDataUnitClosed,
    onEditHabitDataUnitClosed: editHabitDataUnitClosed,
    onEditHabitDataUnitFulfilled:editHabitDataUnitFulfilled,
    isNeedFetchUpdate: isNeedFetchUpdate,
  };

  const contentProps = {
    onCreateToday: createActivityDataUnit,
    onUpdateActivityDataUnit: updateActivityDataUnit,
    onUpdateCategory: updateCategory,
    onDeleteSubCategory: deleteSubCategory,
    onExport: handleExport,
    onImport: handleImport,
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
