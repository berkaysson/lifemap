import React from 'react';

import TaskItem from './TaskItem';
import HabitItem from './HabitItem';

const TasksHabitsList = ({ taskDataUnits, habitDataUnits }) => {
  return (
    <div>
      <h3>Tasks</h3>
      {taskDataUnits.length > 0 ? (
        <ul>
          {taskDataUnits.map((task) => (
            <TaskItem task={task} key={task.id} />
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}

      <h3>Habits</h3>
      {habitDataUnits.length > 0 ? (
        <ul>
          {habitDataUnits.map((habit) => (
            <HabitItem habit={habit} key={habit.id} />
          ))}
        </ul>
      ) : (
        <p>No habits found.</p>
      )}
    </div>
  );
};

export default TasksHabitsList;
