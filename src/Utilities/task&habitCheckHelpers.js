import moment from "moment";
import addDays from "date-fns/addDays";
import { formatDate } from "./dateHelpers";

export const calculateCurrentTimeValue = (unit, activityDataUnitsMap) => {
  const category = unit.category.label;
  const subCategory = unit.subCategory.value;
  let currentTimeValue = 0;

  for (
    let currentDate = moment(unit.startDate);
    currentDate <= moment(unit.endDate);
    currentDate.add(1, "days")
  ) {
    const date = currentDate.format("YYYY-MM-DD");
    const dataUnit = activityDataUnitsMap.get(date);
    if (dataUnit) {
      const timeValue = dataUnit[category][subCategory] * 1;
      if (typeof timeValue === "number" && !Number.isNaN(timeValue)) {
        currentTimeValue += timeValue;
      }
    }
  }
  return currentTimeValue;
};

export const checkDueDate = (unit) => {
  const today = moment(addDays(new Date(), -1));
  const dueDate = moment(moment(unit.endDate));
  return dueDate.isSameOrBefore(today, "day");
};

export const checkIsFulfilled = (unit, activityDataUnitsMap) => {
  let currentTimeValue = calculateCurrentTimeValue(unit, activityDataUnitsMap);
  return currentTimeValue >= unit.timeValue;
};

export const checkCheckpointTasks = (
  startDate,
  endDate,
  unit,
  activityDataUnitsMap
) => {
  const formattedUnit = {
    category: unit.category,
    subCategory: unit.subCategory,
    startDate: startDate,
    endDate: endDate,
    timeValue: unit.timeValue,
  };
  return checkIsFulfilled(formattedUnit, activityDataUnitsMap);
};

export const checkDailyCheckpoint = (habitUnit, activityDataUnitsMap) => {
  let allCheckpointsFulfilled = true;
  let allCheckpointsArray = habitUnit.checkpointObjects;

  for (let i = 0; i < habitUnit.checkpoints.length - 2; i++) {
    const checkpointDate = habitUnit.checkpoints[i];
    let checkpointObject = allCheckpointsArray.find(
      (object) => object.id === checkpointDate + "_cp-start"
    );

    if (
      !checkCheckpointTasks(
        checkpointDate,
        checkpointDate,
        habitUnit,
        activityDataUnitsMap
      )
    ) {
      allCheckpointsFulfilled = false;
    } else {
      checkpointObject.isFulfilled = true;
    }
    checkpointObject.currentValue = calculateCurrentTimeValue(
      checkpointObject,
      activityDataUnitsMap
    );
  }
  return {
    isFulfilled: allCheckpointsFulfilled,
    checkpointObjects: allCheckpointsArray,
  };
};

export const checkNonDailyCheckpoint = (habitUnit, activityDataUnitsMap) => {
  let allCheckpointsFulfilled = true;
  let allCheckpointsArray = habitUnit.checkpointObjects;

  for (let i = 0; i < habitUnit.checkpoints.length - 2; i++) {
    const startDate = habitUnit.checkpoints[i];
    const endDate = formatDate(
      moment(habitUnit.checkpoints[i + 1]).subtract(1, "day")
    );
    let checkpointObject = allCheckpointsArray.find(
      (object) => object.id === startDate + "_cp-start"
    );
    if (
      !checkCheckpointTasks(startDate, endDate, habitUnit, activityDataUnitsMap)
    ) {
      allCheckpointsFulfilled = false;
    } else {
      checkpointObject.isFulfilled = true;
    }
    checkpointObject.currentValue = calculateCurrentTimeValue(
      checkpointObject,
      activityDataUnitsMap
    );
  }
  return {
    isFulfilled: allCheckpointsFulfilled,
    checkpointObjects: allCheckpointsArray,
  };
};
