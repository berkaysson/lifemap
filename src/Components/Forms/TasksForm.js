import { useState } from "react";

import CategorySubCategorySelect from "./CategorySubCategorySelect";
import DateRangeSelector from "./DateRangeSelector";
import TaskFrequencySelector from "./TaskFrequencySelector";

const TasksForm = ({ activityCategories }) => {
  const [task, setTask] = useState({
    category: null,
    subCategory: null,
    startDate: null,
    endDate: null,
    timeValue: null,
    taskFrequency: null,
  });

  const subCategorySelectionHandler = (category, subCategory) => {
    setTask({ ...task, category: category, subCategory: subCategory });
  };

  const dateRangeHandler = (start, end) => {
    setTask({ ...task, startDate: start, endDate: end });
  };

  const frequencySelectionHandler = (frequency) => {
    setTask({ ...task, taskFrequency: frequency });
  };

  const timeValueHandler = (event) => {
    setTask({ ...task, timeValue: event.target.value });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log(task);
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
        />
        <DateRangeSelector onSubmit={dateRangeHandler} />
        <TaskFrequencySelector onSelect={frequencySelectionHandler} />
        <label>Enter minute:</label>
        <input type="number" name="timeValue" onChange={timeValueHandler} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TasksForm;
