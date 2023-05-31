import { useState, useEffect } from "react";
import AppContent from "./AppContent";

const CURRENT_DATE = new Date().toISOString().slice(0, 10);

const AppFetch = ({
  onGetAllCategories,
  onGetAllFinancialUnits,
  onGetAllActivityUnits,
  onGetActivityDataUnit,
  contentProps,
  onFetchUpdate,
  isNeedFetchUpdate
}) => {
  const [categories, setCategories] = useState([]);
  const [activityCategories, setActivityCategories] = useState([]);
  const [financeCategories, setFinanceCategories] = useState([]);

  const [financeDatas, setFinanceDatas] = useState([]);
  const [activityDatas, setActivityDatas] = useState([]);
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

  async function fetchFinanceDatas() {
    try {
      const allFinanceDataUnits = await onGetAllFinancialUnits();
      setFinanceDatas(allFinanceDataUnits);
      console.log("Finance data fetched successfully");
    } catch (error) {
      console.error("Error fetching finance data:", error);
    }
  }

  async function fetchActivityDatas() {
    try {
      const allActivityDataUnits = await onGetAllActivityUnits();
      setActivityDatas(allActivityDataUnits);
      console.log("Activity data fetched successfully");
    } catch (error) {
      console.error("Error fetching activity data:", error);
    }
  }

  async function fetchTodaysActivityDataUnit(){
    try{
      const newTodaysActivityDataUnit = await onGetActivityDataUnit(CURRENT_DATE);
      setTodaysActivityDataUnit(newTodaysActivityDataUnit);
      console.log("Today's activity data fetched successfully");
    }
    catch (error) {
      console.error("Error fetching today's activity data:", error);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchFinanceDatas();
      await fetchActivityDatas();
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
      await fetchFinanceDatas();
      await fetchActivityDatas();
      await fetchTodaysActivityDataUnit();
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatedContentProps = {
    ...contentProps,
    categories,
    activityCategories,
    financeCategories,
    financeDatas,
    activityDatas,
    todaysActivityDataUnit
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <AppContent {...updatedContentProps} />
      )}
    </div>
  );
};

export default AppFetch;
