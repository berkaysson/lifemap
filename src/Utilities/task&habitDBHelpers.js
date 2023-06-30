import moment from "moment";
import { calculateFrequencyDateValue } from "./dateHelpers";

export const addTaskOrHabitDataUnit = async (db, unit, dataType) => {
  try {
    if (dataType === "task") {
      await db.tasksData.put({
        ...unit,
        isFulfilled: false,
        isClosed: false,
        completedValue: 0,
      });
    } else if (dataType === "habit") {
      await db.habitsData.put({
        ...unit,
        isFulfilled: false,
        isClosed: false,
        checkpoints: createCheckpointsHabit(unit),
        checkpointObjects: createCheckpointsTaskForHabit(unit),
      });
    }
  } catch (error) {
    console.error("Error creating data unit:", error);
  }
};

export const createCheckpointsHabit = (habitUnit) => {
  const frequency = habitUnit.frequency;
  const startDate = moment(habitUnit.startDate);
  const endDate = moment(habitUnit.endDate);
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

export const createCheckpointsTaskForHabit = (habitUnit) => {
  const frequency = habitUnit.frequency;
  const startDate = moment(habitUnit.startDate);
  const endDate = moment(habitUnit.endDate);
  let checkpointTasks = [];

  const { coefficient, dateType } = calculateFrequencyDateValue(frequency);

  let currentDate = moment(startDate);

  while (currentDate.isBefore(endDate)) {
    const startDate = currentDate.format("YYYY-MM-DD");
    const endDate = currentDate
      .clone()
      .add(coefficient, dateType)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    let taskObject = {
      startDate: startDate,
      endDate: endDate,
      goalValue: habitUnit.timeValue,
      category: habitUnit.category,
      subCategory: habitUnit.subCategory,
      isFulfilled: false,
      id: startDate + "_cp-start",
      currentValue: 0,
    };
    checkpointTasks.push(taskObject);
    currentDate.add(coefficient, dateType);
  }

  return checkpointTasks;
};

export const deleteTaskOrHabitDataUnit = async (db, dataID, dataType) => {
  try {
    let dataStore;
    if (dataType === "task") {
      dataStore = db.tasksData;
    } else if (dataType === "habit") {
      dataStore = db.habitsData;
    }
    if (await dataStore.get(dataID)) {
      await dataStore.delete(dataID);
    } else {
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

export const editTaskOrHabitSituation = async (
  db,
  dataType,
  prop,
  value,
  dataID
) => {
  try {
    const dataUnit = await db[`${dataType}sData`].get(dataID);
    dataUnit[prop] = value;
    await db[`${dataType}sData`].put(dataUnit);
  } catch (error) {
    console.error(`Error editing ${dataType} unit:`, error);
  }
};
