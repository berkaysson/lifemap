import { useState, useEffect } from "react";
import moment from "moment";

import AppContent from "./AppContent";
import { formatDate } from "../Utilities/formatDate";

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
  onEditTaskDataUnitFulfilled
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

  const calculateCurrentTimeValue = (taskUnit) => {
    const category = taskUnit.category.label;
    const subCategory = taskUnit.subCategory.value;
    let currentTimeValue = 0;
  
    for (
      let startDate = moment(taskUnit.startDate);
      startDate <= moment(taskUnit.endDate);
      startDate.add(1, 'days')
    ) {
      const date = startDate.format('YYYY-MM-DD');
      const dataUnit = activityDataUnits.find((dataUnit) => dataUnit.date === date);
      if (dataUnit) {
        currentTimeValue += dataUnit[category][subCategory] * 1;
      }
    }
  
    return currentTimeValue;
  };

  const checkTasks = async () => {
    const allTaskDataUnits = await onGetAllTaskDataUnits();
    if (allTaskDataUnits) {
      allTaskDataUnits.forEach(async (taskUnit) => {
        let currentTimeValue = calculateCurrentTimeValue(taskUnit)
        if(currentTimeValue >= taskUnit.timeValue) await onEditTaskDataUnitFulfilled(true, taskUnit.id);
        else await onEditTaskDataUnitFulfilled(false, taskUnit.id);
      });
    }
  };

  async function fetchAll() {
    await checkTasks();
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
