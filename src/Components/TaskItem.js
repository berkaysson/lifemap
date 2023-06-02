import React from 'react';

const TaskItem = ({ task }) => {
  return (
    <li id={task?.id}>
      <h3>{task?.nameValue}</h3>
      <p>Category: {task?.category.label}</p>
      <p>Subcategory: {task?.subCategory.label}</p>
      <p>Start Date: {task?.startDate}</p>
      <p>End Date: {task?.endDate}</p>
      <p>Time Value: {task?.timeValue}</p>
    </li>
  );
};

export default TaskItem;