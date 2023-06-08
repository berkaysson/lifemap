import { useState } from "react";

import Button from "../Wrappers/Styled-Elements/Button";

const FinanceDataListItem = ({
  item,
  onDeleteFinancialDataUnit,
  onUpdateFinancialDataUnit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.value);

  const onDeleteItem = (date, dataID) => {
    onDeleteFinancialDataUnit(date, dataID);
  };

  const onUpdateItem = (dateID, dataUnitID, toBeUpdatedData) => {
    onUpdateFinancialDataUnit(dateID, dataUnitID, toBeUpdatedData);
  };

  const handleEditButton = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditValue(item.value);
  };

  const handleSaveEdit = () => {
    const updatedData = {
      value: editValue,
    };
    onUpdateItem(item.date, item.id, updatedData);
    setIsEditing(false);
  };

  return (
    <li id={item.id}>
      {isEditing ? (
        <>
          <h4>{item.category}</h4>
          <div>{item.subCategory}</div>
          <input
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <Button type="button" text={"Save"} onClick={handleSaveEdit} />
          <Button type="button" text={"Cancel"} onClick={handleCancelEdit} />
        </>
      ) : (
        <>
          <h4>
            {item.date}, {item.time}
          </h4>
          <div>{item.subCategory}</div>
          <div>
            {item.formMode === "income" ? "+" : "-"} {item.value}
          </div>
          <Button type="button" text={"Edit"} onClick={handleEditButton} />
          <Button type="button" text={"Delete"} onClick={() => onDeleteItem(item.date, item.id)} />
        </>
      )}
    </li>
  );
};

export default FinanceDataListItem;
