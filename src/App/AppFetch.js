import { useState, useEffect } from "react";

import AppContent from "./AppContent";
// import { formatDate } from "../Utilities/dateHelpers";
import {
  calculateCurrentTimeValue,
  checkDailyCheckpoint,
  checkDueDate,
  checkIsFulfilled,
  checkNonDailyCheckpoint,
} from "../Utilities/task&habitCheckHelpers";
// import moment from "moment";
import LoadingModal from "../Components/Wrappers/LoadingModal";

// const CURRENT_DATE = formatDate(moment());

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
  onEditHabitDataUnitFulfilled,
  onEditTaskDataUnitCompletedValue,
  onEditHabitDataUnitCheckpointObjects,
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
      const newTodaysActivityDataUnit = allActivityDataUnits?.slice(-1)[0];
      setTodaysActivityDataUnit(newTodaysActivityDataUnit);
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

  const checkTasks = async () => {
    const allTaskDataUnits = await onGetAllTaskDataUnits();

    if (allTaskDataUnits) {
      for (const taskUnit of allTaskDataUnits) {
        await onEditTaskDataUnitClosed(checkDueDate(taskUnit), taskUnit.id);

        if (!taskUnit.isClosed) {
          const isFulfilled = checkIsFulfilled(taskUnit, activityDataUnits);
          const completedValue = calculateCurrentTimeValue(
            taskUnit,
            activityDataUnits
          );
          await onEditTaskDataUnitCompletedValue(completedValue, taskUnit.id);
          await onEditTaskDataUnitFulfilled(isFulfilled, taskUnit.id);
        }
      }
    }
  };

  const checkHabits = async () => {
    const allHabitDataUnits = await onGetAllHabitDataUnits();

    if (allHabitDataUnits) {
      for (const habitUnit of allHabitDataUnits) {
        await onEditHabitDataUnitClosed(checkDueDate(habitUnit), habitUnit.id);

        if (!habitUnit.isClosed) {
          checkCheckpointsOfHabitUnit(habitUnit);
        }
      }
    }
  };

  const checkCheckpointsOfHabitUnit = async (habitUnit) => {
    let isFulfilled, checkpointObjects;
  
    if (habitUnit.frequency === "daily") {
      ({ isFulfilled, checkpointObjects } = checkDailyCheckpoint(
        habitUnit,
        activityDataUnits
      ));
    } else {
      ({ isFulfilled, checkpointObjects } = checkNonDailyCheckpoint(
        habitUnit,
        activityDataUnits
      ));
    }
  
    await onEditHabitDataUnitFulfilled(isFulfilled, habitUnit.id);
    await onEditHabitDataUnitCheckpointObjects(checkpointObjects, habitUnit.id);
  };

  async function fetchAll() {
    setIsLoading(true);
    await fetchCategories();
    await fetchFinanceDataUnits();
    await fetchActivityDataUnits();
  }

  const fetchTasksAndHabits = async () => {
    await fetchTaskDataUnits();
    await fetchHabitDataUnits();
  };

  const checkTasksAndHabits = async () => {
    await checkTasks();
    await checkHabits();
  };

  useEffect(() => {
    (async () => {
      await fetchAll();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      await fetchAll();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNeedFetchUpdate]);

  useEffect(() => {
    (async () => {
      await fetchTasksAndHabits();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todaysActivityDataUnit, activityCategories, activityDataUnits]);

  useEffect(() => {
    (async () => {
      await checkTasksAndHabits();
      setIsLoading(false);
      console.log("End fetch");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDataUnits, habitDataUnits]);

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
    <>
      {isLoading ? <LoadingModal /> : ""}

      <AppContent {...updatedContentProps} />
    </>
  );
};

export default AppFetch;
