import React from "react";

import TaskItem from "./TaskItem";
import HabitItem from "./HabitItem";

const TasksHabitsList = ({
  taskDataUnits,
  habitDataUnits,
  onDeleteTaskDataUnit,
  onDeleteHabitDataUnit
}) => {
  return (
    <div>
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
    </div>
  );
};

export default TasksHabitsList;
