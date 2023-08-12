import { useState, useEffect } from "react";

import AppContent from "./AppContent";
import {
  calculateCurrentTimeValue,
  checkDailyCheckpoint,
  checkDueDate,
  checkNonDailyCheckpoint,
} from "../Utilities/task&habitCheckHelpers";
import LoadingModal from "../Components/Wrappers/LoadingModal";

const samplePerformanceState = {
  fetches: {
    category: 0,
    finance: 0,
    tasks: 0,
    habits: 0,
    activities: 0,
  },
  checks: {
    tasks: 0,
    habits: 0,
  },
};

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
  const [activityDataUnitsMap, setActivityDatasMap] = useState(new Map());
  const [taskDataUnits, setTaskDataUnits] = useState([]);
  const [habitDataUnits, setHabitDataUnits] = useState([]);
  const [todaysActivityDataUnit, setTodaysActivityDataUnit] = useState(null);

  const [isLoading, setIsLoading] = useState(true); // Loading state

  const [performanceState, setPerformanceState] = useState({
    fetches: {
      category: 0,
      finance: 0,
      tasks: 0,
      habits: 0,
      activities: 0,
    },
    checks: {
      tasks: 0,
      habits: 0,
    },
  });

  async function fetchCategories() {
    try {
      const startTime = performance.now();
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
      const endTime = performance.now();
      setPerformanceState((prevState) => ({
        ...prevState,
        fetches: {
          ...prevState.fetches,
          category: prevState.fetches.category + endTime - startTime,
        },
      }));
      console.log("Categories fetched successfully");
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchFinanceDataUnits() {
    try {
      const startTime = performance.now();
      const allFinanceDataUnits = await onGetAllFinancialDataUnits();
      setFinanceDatas(allFinanceDataUnits);
      const endTime = performance.now();
      setPerformanceState((prevState) => ({
        ...prevState,
        fetches: {
          ...prevState.fetches,
          finance: prevState.fetches.finance + endTime - startTime,
        },
      }));
      console.log("Finance data fetched successfully");
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  }

  async function fetchActivityDataUnits() {
    try {
      const startTime = performance.now();
      const allActivityDataUnits = await onGetAllActivityDataUnits();
      setActivityDatas(allActivityDataUnits);
      const newTodaysActivityDataUnit = allActivityDataUnits?.slice(-1)[0];
      setTodaysActivityDataUnit(newTodaysActivityDataUnit);
      let activityDataUnitsMapSample = new Map();
      allActivityDataUnits.forEach((dataUnit) => {
        activityDataUnitsMapSample.set(dataUnit.date, dataUnit);
      });
      setActivityDatasMap(activityDataUnitsMapSample);
      const endTime = performance.now();
      setPerformanceState((prevState) => ({
        ...prevState,
        fetches: {
          ...prevState.fetches,
          activities: prevState.fetches.activities + endTime - startTime,
        },
      }));
      console.log("Activity data fetched successfully");
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  }

  async function fetchTaskDataUnits() {
    try {
      const startTime = performance.now();
      const allTaskDataUnits = await onGetAllTaskDataUnits();
      setTaskDataUnits(allTaskDataUnits);
      const endTime = performance.now();
      setPerformanceState((prevState) => ({
        ...prevState,
        fetches: {
          ...prevState.fetches,
          tasks: prevState.fetches.tasks + endTime - startTime,
        },
      }));
      console.log("Task data fetched successfully");
    } catch (error) {
      console.error("Error fetching Task data:", error);
    }
  }

  async function fetchHabitDataUnits() {
    try {
      const startTime = performance.now();
      const allHabitDataUnits = await onGetAllHabitDataUnits();
      setHabitDataUnits(allHabitDataUnits);
      const endTime = performance.now();
      setPerformanceState((prevState) => ({
        ...prevState,
        fetches: {
          ...prevState.fetches,
          habits: prevState.fetches.habits + endTime - startTime,
        },
      }));
      console.log("Habit data fetched successfully");
    } catch (error) {
      console.error("Error fetching Habit data:", error);
    }
  }

  const checkTasks = async () => {
    const startTime = performance.now();
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
    const endTime = performance.now();
    setPerformanceState((prevState) => ({
      ...prevState,
      checks: {
        ...prevState.checks,
        tasks: prevState.checks.tasks + endTime - startTime,
      },
    }));
  };

  const checkHabits = async () => {
    const startTime = performance.now();
    const allHabitDataUnits = habitDataUnits;

    if (allHabitDataUnits) {
      for (const habitUnit of allHabitDataUnits) {
        await onEditHabitDataUnitClosed(checkDueDate(habitUnit), habitUnit.id);

        if (!habitUnit.isClosed) {
          checkCheckpointsOfHabitUnit(habitUnit);
        }
      }
    }
    const endTime = performance.now();
    setPerformanceState((prevState) => ({
      ...prevState,
      checks: {
        ...prevState.checks,
        habits: prevState.checks.habits + endTime - startTime,
      },
    }));
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

  useEffect(()=>{
    (async ()=>{
      await checkTasks();
      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, taskDataUnits);

  useEffect(()=>{
    (async ()=>{
      await checkHabits();
      setIsLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, habitDataUnits);

  useEffect(() => {
    console.log(performanceState);
  }, [performanceState]);

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

  const impactPerformance = () => {
    // Calculate the total for fetches
    const totalFetches = Object.values(performanceState.fetches).reduce(
      (sum, value) => sum + value,
      0
    );

    // Calculate the total for checks
    const totalChecks = Object.values(performanceState.checks).reduce(
      (sum, value) => sum + value,
      0
    );

    // Calculate the percentages for fetches
    const fetchesPercentages = {};
    for (const key in performanceState.fetches) {
      fetchesPercentages[key] =
        (performanceState.fetches[key] / (totalFetches + totalChecks)) * 100;
    }

    // Calculate the percentages for checks
    const checksPercentages = {};
    for (const key in performanceState.checks) {
      checksPercentages[key] =
        (performanceState.checks[key] / (totalChecks + totalFetches)) * 100;
    }

    // Return an object with calculated percentages
    console.log({fetchesPercentages, checksPercentages, total:totalChecks+totalFetches});
  };

  return (
    <>
      {isLoading ? <LoadingModal /> : ""}

      <AppContent {...updatedContentProps} />
      <button
        onClick={() => {
          setPerformanceState(samplePerformanceState);
        }}
        style={{ position: "fixed", zIndex: "99999", top: "0", left: "0" }}
      >
        RESET PERFORMANCE TEST
      </button>
      <button
        onClick={impactPerformance}
        style={{ position: "fixed", zIndex: "99999", top: "0", left: "50%" }}
      >
        SHOW IMPACT
      </button>
    </>
  );
};

export default AppFetch;
