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


export const checkIsFulfilledCheckpoint = (
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
