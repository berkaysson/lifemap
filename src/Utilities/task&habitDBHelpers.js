import moment from "moment";
import { calculateFrequencyDateValue } from "./dateHelpers";

export const addTaskOrHabitDataUnit = async (db, unit, dataType) => {
  try {
    if (dataType === "task") {
      await db.tasksData.put({ ...unit, isFulfilled: false, isClosed: false, completedValue:0, });
      console.log("Task unit added successfully");
    } else if (dataType === "habit") {
      await db.habitsData.put({
        ...unit,
        isFulfilled: false,
        isClosed: false,
        checkpoints: createCheckpointsHabit(unit),
        completedCheckpoint:0,
      });
      console.log("Habit unit added successfully");
    }
  } catch (error) {
    console.error("Error creating data unit:", error);
  }
};

export const createCheckpointsHabit = (habitUnit) => {
  const frequency = habitUnit.frequency;
  const startDate = moment(new Date(habitUnit.startDate));
  const endDate = moment(new Date(habitUnit.endDate));
  let checkpoints = [];

  const { coefficient, dateType } = calculateFrequencyDateValue(frequency);

  let currentDate = moment(startDate);

  while (currentDate.isSameOrBefore(endDate)) {
    checkpoints.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(coefficient, dateType);
  }

  checkpoints.push(endDate.format("YYYY-MM-DD"));

  return checkpoints;
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

export const editTaskOrHabitSituation = async (db, dataType, prop, value, dataID) => {
  try {
    const dataUnit = await db[`${dataType}sData`].get(dataID);
    dataUnit[prop] = value;
    await db[`${dataType}sData`].put(dataUnit);
    console.log(`${dataType} unit edited successfully`);
  } catch (error) {
    console.error(`Error editing ${dataType} unit:`, error);
  }
};
