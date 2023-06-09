import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CategorySubCategorySelect from "../../Categories/CategorySubCategorySelect";
import DateRangeSelector from "../../Wrappers/DateRangeSelector";
import FormWrapper from "../../Wrappers/Styled-Wrappers/FormWrapper";
import Button from "../../Wrappers/Styled-Elements/Button";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";
import moment from "moment";

const TasksForm = ({ activityCategories, onAddTaskUnit }) => {
  const [task, setTask] = useState({
    category: null,
    subCategory: null,
    startDate: null,
    endDate: null,
    timeValue: null,
    nameValue: null,
  });

  const [resetDeleteForm, setResetDeleteForm] = useState(false);
  const [minutesPerDay, setMinutesPerDay] = useState(null);

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

    for(const key in taskUnit){
      if(!taskUnit[key]){
        alert(`Please fill all fields`);
        return
      }
    }

    onAddTaskUnit(taskUnit);
    resetForm();
  };

  useEffect(()=>{
    if(task.startDate && task.endDate){
      const totalDays = moment(task.endDate).diff(moment(task.startDate), "days")+1;
      if(task.timeValue){
        const calculatedMinutesPerDay = ((task.timeValue*1)/(totalDays*1)).toFixed(1);
        setMinutesPerDay(calculatedMinutesPerDay);
      }
    }
  }, [task]);

  const resetForm = () => {
    document.getElementById("form").reset();
    setResetDeleteForm(!resetDeleteForm);
  }

  return (
    <div>
      <FormWrapper onSubmit={formSubmitHandler} disableBoxShadow={true}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
          resetDeleteForm={resetDeleteForm}
        />
        <DateRangeSelector onSubmit={dateRangeHandler} />
        <StyledInput
          type="number"
          name="timeValue"
          onChange={timeValueHandler}
          placeholder="Enter minute"
        />
        <p style={{fontSize:"12px"}}>Minutes per Day: <b>{minutesPerDay}</b></p>
        <StyledInput
          type="text"
          name="nameValue"
          onChange={nameValueHandler}
          placeholder="Enter Name of the task"
        />

        <Button type={"submit"} text={"Submit"} />
      </FormWrapper>
    </div>
  );
};

export default TasksForm;
