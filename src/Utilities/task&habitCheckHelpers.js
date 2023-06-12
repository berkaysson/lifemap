import moment from "moment";
import addDays from "date-fns/addDays";

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
      currentTimeValue += dataUnit[category][subCategory] * 1;
    }
  }

  return currentTimeValue;
};

export const checkDueDate = (unit) => {
  const today = moment(addDays(new Date(), -1));
  const dueDate = moment(addDays(new Date(unit.endDate), -1));
  return dueDate.isBefore(today);
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
      if (
        !checkCheckpointTasks(
          checkpointDate,
          checkpointDate,
          habitUnit,
          activityDataUnits
        )
      ) {
        allCheckpointsFulfilled = false;
      }
      else{
        let checkpointObject = allCheckpointsArray.find((object) => object.id === checkpointDate+"_cp-start");
        checkpointObject.isFulfilled = true;
      }
    }
    return {isFulfilled: allCheckpointsFulfilled, checkpointObjects:allCheckpointsArray};
}

export const checkNonDailyCheckpoint = (habitUnit, activityDataUnits) => {
  let allCheckpointsFulfilled = true;
  let allCheckpointsArray = habitUnit.checkpointObjects;

    for (let i = 0; i < habitUnit.checkpoints.length - 2; i++) {
      const startDate = habitUnit.checkpoints[i];
      const endDate = moment(new Date(habitUnit.checkpoints[i + 1]))
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      if (
        !checkCheckpointTasks(
          startDate,
          endDate,
          habitUnit,
          activityDataUnits
        )
      ) {
        allCheckpointsFulfilled = false;
      }
      else{
        let checkpointObject = allCheckpointsArray.find((object) => object.id === startDate+"_cp-start");
        checkpointObject.isFulfilled = true;
      }
    }
    return {isFulfilled: allCheckpointsFulfilled, checkpointObjects:allCheckpointsArray};
}
