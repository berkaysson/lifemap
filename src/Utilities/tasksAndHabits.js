import { addDays } from "date-fns";
import moment from "moment";

export const addTaskOrHabitDataUnit = async (db, unit, dataType) => {
  try {
    if (dataType === "task") {
      await db.tasksData.put({ ...unit, isFulfilled: false, isClosed: false });
      console.log("Task unit added successfully");
    } else if (dataType === "habit") {
      await db.habitsData.put({ ...unit, isFulfilled: false, isClosed: false });
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

const calculateCurrentTimeValue = (taskUnit, activityDataUnits) => {
  const category = taskUnit.category.label;
  const subCategory = taskUnit.subCategory.value;
  let currentTimeValue = 0;

  for (
    let startDate = moment(taskUnit.startDate);
    startDate <= moment(taskUnit.endDate);
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
  const today = moment(addDays(new Date(), -1));
  const dueDate = moment(new Date(unit.endDate));
  return dueDate.isBefore(today);
};

export const checkIsFulfilled = (taskUnit, activityDataUnits) => {
  let currentTimeValue = calculateCurrentTimeValue(taskUnit, activityDataUnits);
  return currentTimeValue >= taskUnit.timeValue;
};
