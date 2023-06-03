import React from "react";

const TaskItem = ({ task, onDeleteTaskDataUnit }) => {
  const deleteHandler = () => {
    onDeleteTaskDataUnit(task.id);
  };
  return (
    <li id={task?.id}>
      <h3 style={{ color: task?.fulfilled ? "green" : "red" }}>
        {task?.nameValue}
      </h3>
      <p>Category: {task?.category.label}</p>
      <p>Subcategory: {task?.subCategory.label}</p>
      <p>Start Date: {task?.startDate}</p>
      <p>End Date: {task?.endDate}</p>
      <p>Time Value: {task?.timeValue}</p>
      <button type="button" onClick={deleteHandler}>
        Delete
      </button>
    </li>
  );
};

export default TaskItem;
