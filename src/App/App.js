import { useEffect, useState } from "react";
import moment from "moment";
import { formatDate } from "../Utilities/dateHelpers";
import {
  deleteDBHandler,
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
import { inMemoryPersistence, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";

const CURRENT_DATE = formatDate(moment());

function App({ db, STORES }) {
  const [isNeedFetchUpdate, setIsNeedFetchUpdate] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(() => {
    return auth.currentUser ? true : false;
  });
  const [isGuestModeActive, setIsGuestModeActive] = useState(false);
  const [snackbarState, setSnackbarState] = useState({
    open:false,
    message:"",
    severity: "info" //info, error, warning, success 
  });

  useEffect(() => {
    createMissingDataUnits();
    fetchUpdateHandler(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUpdateHandler = (boolean) => {
    setIsNeedFetchUpdate(!isNeedFetchUpdate);
  };

  const snackBarHandler = (message, severity) => {
    setSnackbarState({
      open:true,
      message:message,
      severity:severity
    })
  }

  const snackbarCloseHandler = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarState({
      open:false,
      message:"",
      severity: "info"
    });
  };

  const createActivityDataUnit = async (date = CURRENT_DATE) => {
    const activityDataUnit = await activityDataUnitConstructor(date, db);
    const year = date.slice(0, 4);
    try {
      await db[year].add(activityDataUnit);
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
    await updateRealtimeDatabase();
  };

  const getActivityDataUnit = async (dateID) => {
    try {
      const selectedYear = dateID.slice(0, 4).toString();
      const activityDataUnit = await db[selectedYear].get(dateID);
      if (activityDataUnit) {
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
      console.error(`getAllCategories`);
    }
  };

  const getAllActivityDataUnits = async () => {
    const allActivityDataUnits = [];
    try {
      for (const year of STORES) {
        const newDataUnits = await db[year].toArray();
        allActivityDataUnits.push(...newDataUnits);
      }
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
        return snackBarHandler(`Value is negative, it must be bigger than zero, value after change: ${calculatedValue}`, "warning");
      }
      activityDataUnit[toBeUpdatedActivityData.category][
        toBeUpdatedActivityData.subCategory
      ] = calculatedValue;

      await db[selectedYear].put(activityDataUnit);

      await updateRealtimeDatabase();
      fetchUpdateHandler(true);
      snackBarHandler("Activity Unit Successfully Submitted 🥳", "success");
    } catch (error) {
      console.error("Failed to get activity data unit:", error);
      snackBarHandler("Activity Unit Could not Submitted 😢", "error");
    }
  };

  const updateCategory = async (category, subCategory) => {
    await updateCategoryHelper(db, category, subCategory, snackBarHandler);
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const deleteSubCategory = async (categoryName, categoryID, subCategory) => {
    const allActivityDataUnits = await getAllActivityDataUnits();
    await deleteSubCategoryHelper(
      db,
      categoryName,
      categoryID,
      subCategory,
      allActivityDataUnits,
      snackBarHandler
    );
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const addFinancialDataUnit = async (toBeUpdatedData) => {
    await addFinancialDataUnitHelper(db, toBeUpdatedData, snackBarHandler);
    await updateRealtimeDatabase();
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
      toBeUpdatedData,
      snackBarHandler
    );
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const deleteFinancialDataUnit = async (dateID, dataUnitID) => {
    await deleteFinancialDataUnitHelper(db, dateID, dataUnitID, snackBarHandler);
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const addTaskDataUnit = async (taskUnit) => {
    await addTaskOrHabitDataUnit(db, taskUnit, "task", snackBarHandler);
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const addHabitDataUnit = async (habitUnit) => {
    await addTaskOrHabitDataUnit(db, habitUnit, "habit", snackBarHandler);
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const deleteTaskDataUnit = async (dataID) => {
    await deleteTaskOrHabitDataUnit(db, dataID, "task", snackBarHandler);
    await updateRealtimeDatabase();
    fetchUpdateHandler(true);
  };

  const deleteHabitDataUnit = async (dataID) => {
    await deleteTaskOrHabitDataUnit(db, dataID, "habit", snackBarHandler);
    await updateRealtimeDatabase();
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
    await updateRealtimeDatabase();
  };

  const editTaskDataUnitCompletedValue = async (value, dataID) => {
    await editTaskOrHabitSituation(db, "task", "completedValue", value, dataID);
    await updateRealtimeDatabase();
  };

  const editTaskDataUnitClosed = async (isClosed, dataID) => {
    await editTaskOrHabitSituation(db, "task", "isClosed", isClosed, dataID);
    await updateRealtimeDatabase();
  };

  const editHabitDataUnitFulfilled = async (isFulfilled, dataID) => {
    await editTaskOrHabitSituation(
      db,
      "habit",
      "isFulfilled",
      isFulfilled,
      dataID
    );
    await updateRealtimeDatabase();
  };

  const editHabitDataUnitClosed = async (isClosed, dataID) => {
    await editTaskOrHabitSituation(db, "habit", "isClosed", isClosed, dataID);
    await updateRealtimeDatabase();
  };

  const editHabitDataUnitCheckpointObjects = async (arrayOfObjects, dataID) => {
    await editTaskOrHabitSituation(
      db,
      "habit",
      "checkpointObjects",
      arrayOfObjects,
      dataID
    );
    await updateRealtimeDatabase();
  };

  const handleExport = async () => {
    await exportHandler(db);
  };

  const handleImport = async (blob) => {
    await importHandler(db, blob);
  };

  //firebase

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
      await importHandler(db, blob);
      await db.open();
    }
  };

  // useEffect(()=>{ // not working??
  //   const user = auth.currentUser;
  //   const userId = user ? user.uid : null;

  //   if(userId){
  //     const lifemapDataRef = get(ref(rtDatabase, "users/" + userId));

  //     onValue(lifemapDataRef, async (snapshot) => {
  //       await updateIndexedDatabese();
  //       console.log("Update IDB since change happen in cloud");
  //     });
  //   }
  // }, []);

  const handleLogin = async (email, password) => {
    try {
      setPersistence(auth, inMemoryPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      if (await checkIfUsersFirstLogin()) {
        await updateRealtimeDatabase();
        snackBarHandler("Welcome to the club 🥳 👌", "success");
      } else {
        await updateIndexedDatabese();
        snackBarHandler("Welcome again 🙂 👋", "success");
        createMissingDataUnits();
      }
  
      setIsSignedIn(true);
      setIsGuestModeActive(false);
      fetchUpdateHandler(true);
    } catch (error) {
      alert(error);
      console.log("Sign-in error:", error);
    }
  };
  
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      setIsSignedIn(false);
      setIsGuestModeActive(false);
      deleteDBHandler(db);
      window.location.href = "../lifemap";
      await new Promise(resolve => setTimeout(resolve, 300));
      window.location.reload();
      snackBarHandler("Successfully Signed Out", "success");
    } catch (error) {
      alert(error);
      console.log("Sign-out error:", error);
    }
  };

  const openGuestMode = () => {
    setIsGuestModeActive(true);
    snackBarHandler("Be our Guest 😁 👋", "success");
  };

  const checkIfUsersFirstLogin = async () => {
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    if(userId){
      const lifemapDataRef = get(ref(rtDatabase, "users/" + userId));
      return (await lifemapDataRef).val() == null ? true : false;
    }
    else{
      console.log("No user");
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
    handleLogin: handleLogin,
    handleLogOut: handleLogOut,
    isSignedIn: isSignedIn,
    isGuestModeActive: isGuestModeActive,
    openGuestMode: openGuestMode,
    fetchUpdateHandler:fetchUpdateHandler,
    snackbarState:snackbarState,
    snackbarCloseHandler:snackbarCloseHandler
  };

  return (
    <div className="App">
      <AppFetch {...fetchProps} contentProps={contentProps} />
    </div>
  );
}

export default App;
