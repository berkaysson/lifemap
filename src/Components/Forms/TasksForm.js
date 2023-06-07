import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CategorySubCategorySelect from "./CategorySubCategorySelect";
import DateRangeSelector from "../Wrappers/DateRangeSelector";

const TasksForm = ({ activityCategories, onAddTaskUnit }) => {
  const [task, setTask] = useState({
    category: null,
    subCategory: null,
    startDate: null,
    endDate: null,
    timeValue: null,
    nameValue: null,
  });

  const subCategorySelectionHandler = (category, subCategory) => {
    setTask({ ...task, category: category, subCategory: subCategory });
  };

  const dateRangeHandler = (start, end) => {
    setTask({ ...task, startDate: start, endDate: end });
  };

  const timeValueHandler = (event) => {
    setTask({ ...task, timeValue: event.target.value });
  };

  const nameValueHandler = (event) => {
    setTask({ ...task, nameValue: event.target.value });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const taskUnit = { ...task, id: uuidv4() };
    onAddTaskUnit(taskUnit);
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
        />
        <DateRangeSelector onSubmit={dateRangeHandler} />
        <label>Enter minute:</label>
        <input type="number" name="timeValue" onChange={timeValueHandler} />
        <label>
          Enter Name of the task
          <input type="text" name="nameValue" onChange={nameValueHandler} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TasksForm;
