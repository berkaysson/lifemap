import { useState } from "react";
import ToggleButton from "./UI/ToggleButton";
import TasksForm from "./Forms/TasksForm";
import HabitsForm from "./Forms/HabitsForm";

const TasksHabitsWrapper = ({
  onUpdateData,
  activityCategories,
  categoryOptions,
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
          onUpdateData={onUpdateData}
          activityCategories={activityCategories}
          categoryOptions={categoryOptions}
        />
      ) : (
        <HabitsForm />
      )}
    </div>
  );
};

export default TasksHabitsWrapper;
