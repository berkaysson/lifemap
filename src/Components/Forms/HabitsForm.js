import { useState } from "react";
import CategorySubCategorySelect from "./CategorySubCategorySelect";
import DateRangeSelector from "./DateRangeSelector";

const HabitsForm = ({ activityCategories }) => {
  const [habit, setHabit] = useState({
    category: null,
    subCategory: null,
    startDate: null,
    endDate: null,
    timeValue: null,
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(habit);
  }

  const subCategorySelectionHandler = (category, subCategory) => {
    setHabit({
      ...habit,
      category: category,
      subCategory: subCategory,
    });
  };

  const dateRangeHandler = (start, end) => {
    setHabit({
      ...habit,
      startDate: start,
      endDate: end,
    });
  };

  const timeValueHandler = (event) => {
    setHabit({
      ...habit,
      timeValue: event.target.value,
    });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
        />
        <DateRangeSelector onSubmit={dateRangeHandler} />
        <label>Enter minute:</label>
        <input type="number" name="timeValue" onChange={timeValueHandler} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HabitsForm;
