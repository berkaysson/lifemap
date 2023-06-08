import { useState } from "react";
import ToggleButton from "../Wrappers/Styled-Elements/ToggleButton";
import TasksForm from "./Tasks/TasksForm";
import HabitsForm from "./Habits/HabitsForm";

const TasksHabitsWrapper = ({
  activityCategories,
  onAddTaskUnit,
  onAddHabitUnit,
}) => {
  const [selectedOption, setSelectedOption] = useState("tasks");

  const toggleTasksHabitsHandler = (mode) => {
    setSelectedOption(mode);
  };

  return (
    <div>
      <ToggleButton
        onClick={toggleTasksHabitsHandler}
        options={[
          { value: "tasks", label: "Tasks" },
          { value: "habits", label: "Habits" },
        ]}
      />
      {selectedOption === "tasks" ? (
        <TasksForm
          activityCategories={activityCategories}
          onAddTaskUnit={onAddTaskUnit}
        />
      ) : (
        <HabitsForm
          activityCategories={activityCategories}
          onAddHabitUnit={onAddHabitUnit}
        />
      )}
    </div>
  );
};

export default TasksHabitsWrapper;
