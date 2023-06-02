import React from "react";

const HabitItem = ({ habit, onDeleteHabitDataUnit }) => {
  const deleteHandler = () => {
    onDeleteHabitDataUnit(habit.id);
  };
  return (
    <li id={habit?.id}>
      <h3 style={{ color: habit?.fulfilled ? "green" : "red" }}>
        {habit?.nameValue}
      </h3>
      <p>Category: {habit?.category.label}</p>
      <p>Subcategory: {habit?.subCategory.label}</p>
      <p>Start Date: {habit?.startDate}</p>
      <p>End Date: {habit?.endDate}</p>
      <p>Time Value: {habit?.timeValue}</p>
      <p>Check Frequency: {habit?.frequency}</p>
      <button type="button" onClick={deleteHandler}>
        Delete
      </button>
    </li>
  );
};

export default HabitItem;
