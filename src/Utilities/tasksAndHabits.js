export const addTaskOrHabitDataUnit = async (db, unit, dataType) => {
  try {
    if (dataType === "task") {
      await db.tasksData.put({ ...unit, fulfilled: false, isClosed: false });
      console.log("Task unit added successfully");
    } else if (dataType === "habit") {
      await db.habitsData.put({ ...unit, fulfilled: false, isClosed: false });
      console.log("Habit unit added successfully");
    }
  } catch (error) {
    console.error("Error creating data unit:", error);
  }
};

export const deleteTaskOrHabitDataUnit = async (db, dataID, dataType) => {
  try {
    let dataStore;
    if (dataType === "task") {
      dataStore = db.tasksData;
      console.log("Task Units deleted successfully");
    } else if (dataType === "habit") {
      dataStore = db.habitsData;
      console.log("Habit Units deleted successfully");
    }
    if (await dataStore.get(dataID)) {
      await dataStore.delete(dataID);
    } else {
      console.log("Can't find the data unit");
    }
  } catch (error) {
    console.error("Error deleting data unit:", error);
  }
};

export const getAllTaskOrHabitDataUnits = async (db, dataType) => {
  try {
    let dataStore;
    if (dataType === "task") {
      dataStore = db.tasksData;
    } else if (dataType === "habit") {
      dataStore = db.habitsData;
    }
    const allTaskAndHabitDataUnits = await dataStore.toArray();
    return allTaskAndHabitDataUnits;
  } catch (error) {
    console.error("Error getting all data units:", error);
  }
};
