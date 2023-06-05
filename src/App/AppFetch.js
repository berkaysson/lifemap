import { useState, useEffect } from "react";
import moment from "moment";

import AppContent from "./AppContent";
import { formatDate } from "../Utilities/dateHelpers";
import {
  checkDueDate,
  checkIsFulfilled,
  checkIsFulfilledCheckpoint,
} from "../Utilities/task&habitCheckHelpers";

const CURRENT_DATE = formatDate(new Date());

const AppFetch = ({
  onGetAllCategories,
  onGetAllFinancialDataUnits,
  onGetAllActivityDataUnits,
  onGetActivityDataUnit,
  onGetAllTaskDataUnits,
  onGetAllHabitDataUnits,
  contentProps,
  onFetchUpdate,
  isNeedFetchUpdate,
  onEditTaskDataUnitFulfilled,
  onEditTaskDataUnitClosed,
  onEditHabitDataUnitClosed,
  onEditHabitDataUnitFulfilled
}) => {
  const [categories, setCategories] = useState([]);
  const [activityCategories, setActivityCategories] = useState([]);
  const [financialCategories, setFinanceCategories] = useState([]);

  const [financeDataUnits, setFinanceDatas] = useState([]);
  const [activityDataUnits, setActivityDatas] = useState([]);
  const [taskDataUnits, setTaskDataUnits] = useState([]);
  const [habitDataUnits, setHabitDataUnits] = useState([]);
  const [todaysActivityDataUnit, setTodaysActivityDataUnit] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Loading state

  async function fetchCategories() {
    try {
      const newCategories = await onGetAllCategories();
      setCategories(newCategories);
      setActivityCategories(() =>
        newCategories.filter(
          (item) =>
            item.id !== "expenseCategories" && item.id !== "incomeCategories"
        )
      );
      setFinanceCategories(() =>
        newCategories.filter(
          (item) =>
            item.id === "expenseCategories" || item.id === "incomeCategories"
        )
      );
      console.log("Categories fetched successfully");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchFinanceDataUnits() {
    try {
      const allFinanceDataUnits = await onGetAllFinancialDataUnits();
      setFinanceDatas(allFinanceDataUnits);
      console.log("Finance data fetched successfully");
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  }

  async function fetchActivityDataUnits() {
    try {
      const allActivityDataUnits = await onGetAllActivityDataUnits();
      setActivityDatas(allActivityDataUnits);
      console.log("Activity data fetched successfully");
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  }

  async function fetchTaskDataUnits() {
    try {
      const allTaskDataUnits = await onGetAllTaskDataUnits();
      setTaskDataUnits(allTaskDataUnits);
      console.log("Task data fetched successfully");
    } catch (error) {
      console.error("Error fetching Task data:", error);
    }
  }

  async function fetchHabitDataUnits() {
    try {
      const allHabitDataUnits = await onGetAllHabitDataUnits();
      setHabitDataUnits(allHabitDataUnits);
      console.log("Habit data fetched successfully");
    } catch (error) {
      console.error("Error fetching Habit data:", error);
    }
  }

  async function fetchTodaysActivityDataUnit() {
    try {
      const newTodaysActivityDataUnit = await onGetActivityDataUnit(
        CURRENT_DATE
      );
      setTodaysActivityDataUnit(newTodaysActivityDataUnit);
      console.log("Today's activity data fetched successfully");
    } catch (error) {
      console.error("Error fetching today's activity data:", error);
    }
  }

  const checkTasks = async () => {
    const allTaskDataUnits = await onGetAllTaskDataUnits();

    if (allTaskDataUnits) {
      for (const taskUnit of allTaskDataUnits) {
        await onEditTaskDataUnitClosed(
          checkDueDate(taskUnit),
          taskUnit.id
        );

        if (!taskUnit.isClosed) {
          const isFulfilled = checkIsFulfilled(taskUnit, activityDataUnits);
          await onEditTaskDataUnitFulfilled(isFulfilled, taskUnit.id);
        }
      }
    }
  };

  const checkHabits = async () => {
    const allHabitDataUnits = await onGetAllHabitDataUnits();

    if (allHabitDataUnits) {
      for (const habitUnit of allHabitDataUnits) {
        // Check for due date
        await onEditHabitDataUnitClosed(checkDueDate(habitUnit), habitUnit.id);

        if (!habitUnit.isClosed) {
          if (habitUnit.frequency !== "daily") {
            checkCheckpointsForFulfillment(habitUnit);
          }
          else {
            checkDailyForFulfillment(habitUnit);
          }
        }
      }
    }
  };

  const checkDailyForFulfillment = async (habitUnit) => {
    let allCheckpointsFulfilled = true;

    for (let i = 0; i < habitUnit.checkpoints.length - 2; i++) {
      const checkpointDate = habitUnit.checkpoints[i];
      if(!checkIsFulfilledCheckpoint(checkpointDate, checkpointDate, habitUnit, activityDataUnits)){
        allCheckpointsFulfilled = false;
        await onEditHabitDataUnitFulfilled(false, habitUnit.id);
      }
    }
    if (allCheckpointsFulfilled) {
      await onEditHabitDataUnitFulfilled(true, habitUnit.id);
    }
  }

  const checkCheckpointsForFulfillment = async (habitUnit) => {
    let allCheckpointsFulfilled = true;

    for (let i = 0; i < habitUnit.checkpoints.length - 2; i++) {
      const startDate = habitUnit.checkpoints[i];
      const endDate = moment(new Date(habitUnit.checkpoints[i + 1]))
        .subtract(1, "day")
        .format("YYYY-MM-DD");
      console.log(startDate, endDate);
      console.log(checkIsFulfilledCheckpoint(startDate, endDate, habitUnit, activityDataUnits));
      if (!checkIsFulfilledCheckpoint(startDate, endDate, habitUnit, activityDataUnits)) {
      allCheckpointsFulfilled = false;
      await onEditHabitDataUnitFulfilled(false, habitUnit.id);
      }
    }

    if (allCheckpointsFulfilled) {
      await onEditHabitDataUnitFulfilled(true, habitUnit.id);
    }
  };

  async function fetchAll() {
    await fetchCategories();
    await fetchFinanceDataUnits();
    await fetchActivityDataUnits();
    await fetchTaskDataUnits();
    await fetchHabitDataUnits();
    await fetchTodaysActivityDataUnit();
    await checkTasks();
    await checkHabits();
    await fetchCategories();
    await fetchFinanceDataUnits();
    await fetchActivityDataUnits();
    await fetchTaskDataUnits();
    await fetchHabitDataUnits();
    await fetchTodaysActivityDataUnit();
  }

  useEffect(() => {
    (async () => {
      await fetchAll();
      setIsLoading(false);
      onFetchUpdate(false);
      console.log("Fetch Updated");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNeedFetchUpdate]);

  useEffect(() => {
    (async () => {
      await fetchAll();
      setIsLoading(false);
      console.log("First Fetch");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatedContentProps = {
    ...contentProps,
    categories,
    activityCategories,
    financialCategories,
    financeDataUnits,
    activityDataUnits,
    taskDataUnits,
    habitDataUnits,
    todaysActivityDataUnit,
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <AppContent {...updatedContentProps} />}
    </div>
  );
};

export default AppFetch;
