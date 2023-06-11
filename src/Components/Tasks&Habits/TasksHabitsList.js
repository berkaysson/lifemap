import React from "react";

import TaskItem from "./Tasks/TaskItem";
import HabitItem from "./Habits/HabitItem";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const TasksHabitsList = ({
  taskDataUnits,
  habitDataUnits,
  onDeleteTaskDataUnit,
  onDeleteHabitDataUnit,
}) => {
  return (
    <CardWrapper>
      <h3>Tasks</h3>
      {taskDataUnits.length > 0 ? (
        <ul>
          {taskDataUnits.map((task) => (
            <TaskItem
              task={task}
              key={task.id}
              onDeleteTaskDataUnit={onDeleteTaskDataUnit}
            />
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}

      <h3>Habits</h3>
      {habitDataUnits.length > 0 ? (
        <ul>
          {habitDataUnits.map((habit) => (
            <HabitItem
              habit={habit}
              key={habit.id}
              onDeleteHabitDataUnit={onDeleteHabitDataUnit}
            />
          ))}
        </ul>
      ) : (
        <p>No habits found.</p>
      )}
    </CardWrapper>
  );
};

export default TasksHabitsList;
