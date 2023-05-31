import { useState, useEffect } from "react";

import AppContent from "./AppContent";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

const AppFetch = ({
  onGetAllCategories,
  onGetAllFinancialDataUnits,
  onGetAllActivityDataUnits,
  onGetActivityDataUnit,
  contentProps,
  onFetchUpdate,
  isNeedFetchUpdate,
}) => {
  const [categories, setCategories] = useState([]);
  const [activityCategories, setActivityCategories] = useState([]);
  const [financialCategories, setFinanceCategories] = useState([]);

  const [financeDataUnits, setFinanceDatas] = useState([]);
  const [activityDataUnits, setActivityDatas] = useState([]);
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

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchFinanceDataUnits();
      await fetchActivityDataUnits();
      await fetchTodaysActivityDataUnit();
      setIsLoading(false);
      onFetchUpdate(false);
      console.log("Fetch Updated");
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNeedFetchUpdate]);

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchFinanceDataUnits();
      await fetchActivityDataUnits();
      await fetchTodaysActivityDataUnit();
      setIsLoading(false);
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
    todaysActivityDataUnit,
  };

  return (
    <div>
      {isLoading ? <p>Loading...</p> : <AppContent {...updatedContentProps} />}
    </div>
  );
};

export default AppFetch;
