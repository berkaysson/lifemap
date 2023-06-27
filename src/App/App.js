import { useEffect, useState } from "react";
import moment from "moment";
import { formatDate } from "../Utilities/dateHelpers";
import {
  exportHandler,
  importHandler,
} from "../Utilities/export&importHelpers";

import activityDataUnitConstructor from "../Data/activityDataUnitConstructor";

import AppFetch from "./AppFetch";
import {
  addTaskOrHabitDataUnit,
  deleteTaskOrHabitDataUnit,
  editTaskOrHabitSituation,
  getAllTaskOrHabitDataUnits,
} from "../Utilities/task&habitDBHelpers";
import {
  addFinancialDataUnitHelper,
  deleteFinancialDataUnitHelper,
  updateFinancialDataUnitHelper,
} from "../Utilities/financialDataHelpers";
import {
  deleteSubCategoryHelper,
  updateCategoryHelper,
} from "../Utilities/categotyHelpers";
import { auth, rtDatabase } from "../firebase";
import { get, ref, set } from "firebase/database";
import { exportDB } from "dexie-export-import";

const CURRENT_DATE = formatDate(moment());

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

  const createActivityDataUnit = async (date = CURRENT_DATE) => {
    const activityDataUnit = await activityDataUnitConstructor(date, db);
    const year = date.slice(0, 4);
    try {
      await db[year].add(activityDataUnit);
      console.log("Activity Data unit added successfully");
    } catch (error) {
      console.error("Error adding activity data unit:", error);
    }
  };

  const createFinancialDataUnit = async (date = CURRENT_DATE) => {
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
    await updateCategoryHelper(db, category, subCategory);
    fetchUpdateHandler(true);
  };

  const deleteSubCategory = async (categoryName, categoryID, subCategory) => {
    const allActivityDataUnits = await getAllActivityDataUnits();
    await deleteSubCategoryHelper(
      db,
      categoryName,
      categoryID,
      subCategory,
      allActivityDataUnits
    );
    fetchUpdateHandler(true);
  };

  const addFinancialDataUnit = async (toBeUpdatedData) => {
    await addFinancialDataUnitHelper(db, toBeUpdatedData);
    fetchUpdateHandler(true);
  };

  const updateFinancialDataUnit = async (
    dateID,
    dataUnitID,
    toBeUpdatedData
  ) => {
    await updateFinancialDataUnitHelper(
      db,
      dateID,
      dataUnitID,
      toBeUpdatedData
    );
    fetchUpdateHandler(true);
  };

  const deleteFinancialDataUnit = async (dateID, dataUnitID) => {
    await deleteFinancialDataUnitHelper(db, dateID, dataUnitID);
    fetchUpdateHandler(true);
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
  };

  const deleteHabitDataUnit = async (dataID) => {
    await deleteTaskOrHabitDataUnit(db, dataID, "habit");
    fetchUpdateHandler(true);
  };

  const getAllTaskDataUnits = async () => {
    return await getAllTaskOrHabitDataUnits(db, "task");
  };

  const getAllHabitDataUnits = async () => {
    return await getAllTaskOrHabitDataUnits(db, "habit");
  };

  const editTaskDataUnitFulfilled = async (isFulfilled, dataID) => {
    await editTaskOrHabitSituation(
      db,
      "task",
      "isFulfilled",
      isFulfilled,
      dataID
    );
  };

  const editTaskDataUnitCompletedValue = async (value, dataID) => {
    await editTaskOrHabitSituation(db, "task", "completedValue", value, dataID);
  };

  const editTaskDataUnitClosed = async (isClosed, dataID) => {
    await editTaskOrHabitSituation(db, "task", "isClosed", isClosed, dataID);
  };

  const editHabitDataUnitFulfilled = async (isFulfilled, dataID) => {
    await editTaskOrHabitSituation(
      db,
      "habit",
      "isFulfilled",
      isFulfilled,
      dataID
    );
  };

  const editHabitDataUnitClosed = async (isClosed, dataID) => {
    await editTaskOrHabitSituation(db, "habit", "isClosed", isClosed, dataID);
  };

  const editHabitDataUnitCheckpointObjects = async (arrayOfObjects, dataID) => {
    await editTaskOrHabitSituation(
      db,
      "habit",
      "checkpointObjects",
      arrayOfObjects,
      dataID
    );
  };

  const handleExport = async () => {
    await exportHandler(db);
  };

  const handleImport = async (blob) => {
    await importHandler(db, blob);
  };

  const updateRealtimeDatabase = async () => {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (userId) {
      const blob = await exportDB(db, { prettyJson: true });
      const reader = new FileReader();
      const fileData = await new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(blob);
      });
      console.log(blob);
      set(ref(rtDatabase, "users/" + userId), {
        email: user.email,
        userId: userId,
        lifemapData: fileData,
      });
    }
  };

  const updateIndexedDatabese = async () => {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;

    if (userId) {
      const lifemapDataRef = get(ref(rtDatabase, "users/" + userId));
      const dataFromRealtime = (await lifemapDataRef).val().lifemapData;
      const blob = new Blob([dataFromRealtime], {
        type: "text/json",
      });
      importHandler(db, blob);
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
    onEditTaskDataUnitClosed: editTaskDataUnitClosed,
    onEditHabitDataUnitClosed: editHabitDataUnitClosed,
    onEditHabitDataUnitFulfilled: editHabitDataUnitFulfilled,
    onEditTaskDataUnitCompletedValue: editTaskDataUnitCompletedValue,
    onEditHabitDataUnitCheckpointObjects: editHabitDataUnitCheckpointObjects,
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
    onUpdateRealtimeDatabase: updateRealtimeDatabase,
    onUpdateIndexedDatabase: updateIndexedDatabese,
  };

  return (
    <div className="App">
      <AppFetch {...fetchProps} contentProps={contentProps} />
    </div>
  );
}

export default App;
