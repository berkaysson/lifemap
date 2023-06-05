import { addDays } from "date-fns";
import moment from "moment";
import { calculateFrequencyDateValue } from "./dateHelpers";

export const addTaskOrHabitDataUnit = async (db, unit, dataType) => {
  try {
    if (dataType === "task") {
      await db.tasksData.put({ ...unit, isFulfilled: false, isClosed: false });
      console.log("Task unit added successfully");
    } else if (dataType === "habit") {
      await db.habitsData.put({
        ...unit,
        isFulfilled: false,
        isClosed: false,
        checkpoints: createCheckpointsHabit(unit),
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

const calculateCurrentTimeValue = (unit, activityDataUnits) => {
  const category = unit.category.label;
  const subCategory = unit.subCategory.value;
  let currentTimeValue = 0;
  for (
    let startDate = moment(unit.startDate);
    startDate <= moment(unit.endDate);
    startDate.add(1, "days")
  ) {
    const date = startDate.format("YYYY-MM-DD");
    const dataUnit = activityDataUnits.find(
      (dataUnit) => dataUnit.date === date
    );
    if (dataUnit) {
      currentTimeValue += dataUnit[category][subCategory] * 1;
    }
  }

  return currentTimeValue;
};

export const checkDueDate = (unit) => {
  const today = moment(addDays(new Date(), -1));  //should check current day after the day
  const dueDate = moment(addDays(new Date(unit.endDate), -1));
  return dueDate.isBefore(today);
};

export const checkIsFulfilled = (unit, activityDataUnits) => {
  let currentTimeValue = calculateCurrentTimeValue(unit, activityDataUnits);
  return currentTimeValue >= unit.timeValue;
};

export const checkIsFulfilledCheckpoint = (startDate, endDate, unit, activityDataUnits) => {
  const formattedUnit = {
    category:unit.category,
    subCategory:unit.subCategory,
    startDate:startDate,
    endDate:endDate,
    timeValue:unit.timeValue
  }
  return checkIsFulfilled(formattedUnit, activityDataUnits);
}