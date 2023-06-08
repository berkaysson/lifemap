import React from "react";

import Button from "../../Wrappers/Styled-Elements/Button";

const TaskItem = ({ task, onDeleteTaskDataUnit }) => {
  const deleteHandler = () => {
    onDeleteTaskDataUnit(task.id);
  };
  return (
    <li id={task?.id}>
      <h3 style={{ color: task?.isFulfilled ? "green" : "red" }}>
        {task?.nameValue} {task?.isClosed ? "(Closed)":""}
      </h3>
      <p>Category: {task?.category.label}</p>
      <p>Subcategory: {task?.subCategory.label}</p>
      <p>Start Date: {task?.startDate}</p>
      <p>End Date: {task?.endDate}</p>
      <p>Time Value: {task?.timeValue}</p>
      <Button type={"button"} text={"Delete"} onClick={deleteHandler} />
    </li>
  );
};

export default TaskItem;
