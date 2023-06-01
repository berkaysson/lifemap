import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

  const nameValueHandler = (event) => {
    setHabit({ ...habit, nameValue: event.target.value });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const habitUnit = { ...habit, id: uuidv4() };
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
        />
        
        <label>Enter minute:</label>
        <input type="number" name="timeValue" onChange={timeValueHandler} />
        <label>
          Enter Name of the habit
          <input type="text" name="nameValue" onChange={nameValueHandler}  />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default HabitsForm;
