import { useState, useEffect } from "react";

import AppContent from "./AppContent";
import {
  calculateCurrentTimeValue,
  checkDailyCheckpoint,
  checkDueDate,
  checkNonDailyCheckpoint,
} from "../Utilities/task&habitCheckHelpers";
import LoadingModal from "../Components/Wrappers/LoadingModal";

const AppFetch = ({
  onGetAllCategories,
  onGetAllFinancialDataUnits,
  onGetAllActivityDataUnits,
  onGetAllTaskDataUnits,
  onGetAllHabitDataUnits,
  contentProps,
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
  const [activityDataUnitsMap, setActivityDatasMap] = useState(new Map());
  const [taskDataUnits, setTaskDataUnits] = useState([]);
  const [habitDataUnits, setHabitDataUnits] = useState([]);
  const [todaysActivityDataUnit, setTodaysActivityDataUnit] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

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
      // console.log("Categories fetched successfully");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchFinanceDataUnits() {
    try {
      const allFinanceDataUnits = await onGetAllFinancialDataUnits();
      setFinanceDatas(allFinanceDataUnits);
      // console.log("Finance data fetched successfully");
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
      let activityDataUnitsMapSample = new Map();
      allActivityDataUnits.forEach((dataUnit) => {
        activityDataUnitsMapSample.set(dataUnit.date, dataUnit);
      });
      setActivityDatasMap(activityDataUnitsMapSample);
      // console.log("Activity data fetched successfully");
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  }

  async function fetchTaskDataUnits() {
    try {
      const allTaskDataUnits = await onGetAllTaskDataUnits();
      setTaskDataUnits(allTaskDataUnits);
      // console.log("Task data fetched successfully");
    } catch (error) {
      console.error("Error fetching Task data:", error);
    }
  }

  async function fetchHabitDataUnits() {
    try {
      const allHabitDataUnits = await onGetAllHabitDataUnits();
      setHabitDataUnits(allHabitDataUnits);
      // console.log("Habit data fetched successfully");
    } catch (error) {
      console.error("Error fetching Habit data:", error);
    }
  }

  const checkTasks = async () => {
    const allTaskDataUnits = taskDataUnits;

    if (allTaskDataUnits) {
      for (const taskUnit of allTaskDataUnits) {
        await onEditTaskDataUnitClosed(checkDueDate(taskUnit), taskUnit.id);

        if (!taskUnit.isClosed) {
          const completedValue = calculateCurrentTimeValue(
            taskUnit,
            activityDataUnitsMap
          );
          const isFulfilled = completedValue >= taskUnit.timeValue;
          await onEditTaskDataUnitCompletedValue(completedValue, taskUnit.id);
          await onEditTaskDataUnitFulfilled(isFulfilled, taskUnit.id);
        }
      }
    }
  };

  const checkHabits = async () => {
    const allHabitDataUnits = habitDataUnits;

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
        activityDataUnitsMap
      ));
    } else {
      ({ isFulfilled, checkpointObjects } = checkNonDailyCheckpoint(
        habitUnit,
        activityDataUnitsMap
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
  }, [todaysActivityDataUnit, activityDataUnits]);

  useEffect(() => {
    (async () => {
      await checkTasks();
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDataUnits]);

  useEffect(() => {
    (async () => {
      await checkHabits();
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitDataUnits]);

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
