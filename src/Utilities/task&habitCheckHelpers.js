import moment from "moment";
import addDays from "date-fns/addDays";
import { formatDate } from "./dateHelpers";

export const calculateCurrentTimeValue = (unit, activityDataUnits) => {
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
      const timeValue = dataUnit[category][subCategory] * 1
      if (typeof timeValue === "number" && !Number.isNaN(timeValue)){
        currentTimeValue += dataUnit[category][subCategory] * 1;
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

export const checkIsFulfilled = (unit, activityDataUnits) => {
  let currentTimeValue = calculateCurrentTimeValue(unit, activityDataUnits);
  return currentTimeValue >= unit.timeValue;
};

export const checkCheckpointTasks = (
  startDate,
  endDate,
  unit,
  activityDataUnits
) => {
  const formattedUnit = {
    category: unit.category,
    subCategory: unit.subCategory,
    startDate: startDate,
    endDate: endDate,
    timeValue: unit.timeValue,
  };
  return checkIsFulfilled(formattedUnit, activityDataUnits);
};

export const checkDailyCheckpoint = (habitUnit, activityDataUnits) => {
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
        activityDataUnits
      )
    ) {
      allCheckpointsFulfilled = false;
    } else {
      checkpointObject.isFulfilled = true;
    }
    checkpointObject.currentValue = calculateCurrentTimeValue(
      checkpointObject,
      activityDataUnits
    );
  }
  return {
    isFulfilled: allCheckpointsFulfilled,
    checkpointObjects: allCheckpointsArray,
  };
};

export const checkNonDailyCheckpoint = (habitUnit, activityDataUnits) => {
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
      !checkCheckpointTasks(startDate, endDate, habitUnit, activityDataUnits)
    ) {
      allCheckpointsFulfilled = false;
    } else {
      checkpointObject.isFulfilled = true;
    }
    checkpointObject.currentValue = calculateCurrentTimeValue(
      checkpointObject,
      activityDataUnits
    );
  }
  return {
    isFulfilled: allCheckpointsFulfilled,
    checkpointObjects: allCheckpointsArray,
  };
};
