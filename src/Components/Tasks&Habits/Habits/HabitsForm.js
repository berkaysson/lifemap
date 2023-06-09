import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CategorySubCategorySelect from "../../Categories/CategorySubCategorySelect";
import HabitFrequencySelector from "./HabitFrequencySelector";
import HabitDurationInput from "./HabitDurationInput";
import FormWrapper from "../../Wrappers/Styled-Wrappers/FormWrapper";
import Button from "../../Wrappers/Styled-Elements/Button";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";

const HabitsForm = ({ onAddHabitUnit, activityCategories }) => {
  const [habit, setHabit] = useState({
    category: null,
    subCategory: null,
    startDate: null,
    endDate: null,
    timeValue: null,
    frequency: null,
  });

  const subCategorySelectionHandler = (category, subCategory) => {
    setHabit({
      ...habit,
      category: category,
      subCategory: subCategory,
    });
  };

  const durationHandler = (start, end) => {
    setHabit({
      ...habit,
      startDate: start,
      endDate: end,
    });
  };

  const frequencyHandler = (value) => {
    setHabit({ ...habit, frequency: value });
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
    onAddHabitUnit(habitUnit);
  };

  return (
    <div>
      <FormWrapper onSubmit={formSubmitHandler}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
        />
        <HabitFrequencySelector onSelect={frequencyHandler} />
        <HabitDurationInput onChange={durationHandler} frequency={habit.frequency} />
        <label>Enter minute:</label>
        <StyledInput type="number" name="timeValue" onChange={timeValueHandler} />
        <label>
          Enter Name of the habit
          <StyledInput type="text" name="nameValue" onChange={nameValueHandler} />
        </label>
        <Button type={"submit"} text={"Submit"} />
      </FormWrapper>
    </div>
  );
};

export default HabitsForm;
