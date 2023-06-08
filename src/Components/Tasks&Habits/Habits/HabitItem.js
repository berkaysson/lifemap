import React from "react";
import moment from "moment";

import Button from "../../Wrappers/Styled-Elements/Button";

const HabitItem = ({ habit, onDeleteHabitDataUnit }) => {
  const deleteHandler = () => {
    onDeleteHabitDataUnit(habit.id);
  };
  return (
    <li id={habit?.id}>
      <h3 style={{ color: habit?.isFulfilled ? "green" : "red" }}>
        {habit?.nameValue} {habit?.isClosed ? "(Closed)":""}
      </h3>
      <p>Category: {habit?.category.label}</p>
      <p>Subcategory: {habit?.subCategory.label}</p>
      <p>Start Date: {habit?.startDate}</p>
      <p>End Date: {habit ? moment(new Date(habit?.endDate))
              .subtract(1, 'day').format("YYYY-MM-DD") : "no end date"}</p>
      <p>Time Value: {habit?.timeValue}</p>
      <p>Check Frequency: {habit?.frequency}</p>
      <Button type={"button"} text={"Delete"} onClick={deleteHandler} />
    </li>
  );
};

export default HabitItem;
