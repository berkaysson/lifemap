import React from 'react';

const HabitItem = ({ habit }) => {
  return (
    <li id={habit?.id}>
      <h3>{habit?.nameValue}</h3>
      <p>Category: {habit?.category.label}</p>
      <p>Subcategory: {habit?.subCategory.label}</p>
      <p>Start Date: {habit?.startDate}</p>
      <p>End Date: {habit?.endDate}</p>
      <p>Time Value: {habit?.timeValue}</p>
      <p>Check Frequency: {habit?.frequency}</p>
    </li>
  );
};

export default HabitItem;