import { useMemo } from "react";
import ResponsiveBarChart from "./ResponsiveBar";
import CalendarChart from "./CalendarChart";

const Charts = ({
  activityDataUnits,
  dateRange,
  selectedCategory,
  selectedSubCategory,
  selectedChartType,
}) => {
  const filteredData = useMemo(() => {
    return activityDataUnits.filter((data) => {
      const isDateInRange =
        (!dateRange.startDate || data.date >= dateRange.startDate) &&
        (!dateRange.endDate || data.date <= dateRange.endDate);

      const isCategoryMatch =
        (selectedCategory && data[selectedCategory.label] != null) ?? false;

      const isSubCategoryMatch =
        (selectedSubCategory &&
          data[selectedCategory.label][selectedSubCategory.label] != null) ??
        false;
      return isDateInRange && isCategoryMatch && isSubCategoryMatch;
    });
  }, [activityDataUnits, dateRange, selectedCategory, selectedSubCategory]);

  const data = filteredData.map((dataPoint) => ({
    day: dataPoint.date,
    value: dataPoint[selectedCategory.label][selectedSubCategory.label] * 1,
  }));

  return selectedChartType === "bar" ? (
    <ResponsiveBarChart
      data={data}
      selectedCategory={selectedCategory}
      selectedSubCategory={selectedSubCategory}
    />
  ) : (
    <CalendarChart />
  );
};

export default Charts;
