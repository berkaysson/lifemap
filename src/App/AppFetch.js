import { useState, useEffect } from "react";
import AppContent from "./AppContent";

const AppFetch = ({
  onGetAllCategories,
  onGetAllFinancialUnits,
  onGetAllActivityUnits,
  contentProps,
}) => {
  const [categories, setCategories] = useState([]);
  const [activityCategories, setActivityCategories] = useState([]);
  const [financeCategories, setFinanceCategories] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [financeDatas, setFinanceDatas] = useState([]);
  const [activityDatas, setActivityDatas] = useState([]);

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

  useEffect(() => {
    setCategoryOptions(() =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
        subCategories: category.subCategories,
      }))
    );
    console.log("Category options assigned successfully");

  }, [categories]);

  useEffect(() => {
    (async () => {
      await fetchCategories();
      await fetchFinanceDatas();
      await fetchActivityDatas();
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updatedContentProps = {
    ...contentProps,
    categories,
    activityCategories,
    financeCategories,
    categoryOptions,
    financeDatas,
    activityDatas,
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
