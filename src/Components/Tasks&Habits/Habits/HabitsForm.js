import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import CategorySubCategorySelect from "../../Categories/CategorySubCategorySelect";
import HabitFrequencySelector from "./HabitFrequencySelector";
import HabitDurationInput from "./HabitDurationInput";
import FormWrapper from "../../Wrappers/Styled-Wrappers/FormWrapper";
import Button from "../../Wrappers/Styled-Elements/Button";
import StyledInput from "../../Wrappers/Styled-Elements/StyledInput";
import { calculateFrequencyDateValue } from "../../../Utilities/dateHelpers";

const HabitsForm = ({ onAddHabitUnit, activityCategories }) => {
  const [habit, setHabit] = useState({
    category: null,
    subCategory: null,
    startDate: null,
    endDate: null,
    timeValue: null,
    frequency: null,
    period: null,
  });

  const [resetDeleteForm, setResetDeleteForm] = useState(false);
  const [habitSummary, setHabitSummary] = useState("");

  const subCategorySelectionHandler = (category, subCategory) => {
    setHabit({
      ...habit,
      category: category,
      subCategory: subCategory,
    });
  };

  const durationHandler = (start, end, duration) => {
    setHabit({
      ...habit,
      startDate: start,
      endDate: end,
      period: duration,
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

    for (const key in habitUnit) {
      if (!habitUnit[key]) {
        alert(`Please fill all fields`);
        return;
      }
    }

    onAddHabitUnit(habitUnit);
    resetForm();
  };

  const resetForm = () => {
    document.getElementById("form").reset();
    setResetDeleteForm(!resetDeleteForm);
  };

  useEffect(() => {
    if (
      habit.subCategory &&
      habit.frequency &&
      habit.timeValue &&
      habit.startDate
    ) {
      const timeUnit = calculateFrequencyDateValue(habit.frequency).dateType.slice(0, -1);
      setHabitSummary(
        `Complete ${habit.category.label}-${habit.subCategory.label}, ${habit.period} ${habit.frequency} and for each ${timeUnit} ${habit.timeValue} minutes`
      );
    } else {
      setHabitSummary("");
    }
  }, [habit]);

  return (
    <div>
      <FormWrapper onSubmit={formSubmitHandler} disableBoxShadow={true}>
        <CategorySubCategorySelect
          categories={activityCategories}
          onSubCategorySelect={subCategorySelectionHandler}
          resetDeleteForm={resetDeleteForm}
        />
        <HabitFrequencySelector
          onSelect={frequencyHandler}
          resetDeleteForm={resetDeleteForm}
        />
        <HabitDurationInput
          onChange={durationHandler}
          frequency={habit.frequency}
          resetDeleteForm={resetDeleteForm}
        />
        <StyledInput
          type="number"
          name="timeValue"
          onChange={timeValueHandler}
          placeholder="Enter minute"
        />
        <p style={{fontSize:"12px"}}>{habitSummary}</p>
        <StyledInput
          type="text"
          name="nameValue"
          onChange={nameValueHandler}
          placeholder="Enter Name of the habit"
        />
        <Button type={"submit"} text={"Submit"} />
      </FormWrapper>
    </div>
  );
};

export default HabitsForm;
