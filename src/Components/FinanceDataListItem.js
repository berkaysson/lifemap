import { useState } from "react";

const FinanceDataListItem = ({
  item,
  onDeleteFinancialData,
  onUpdateFinancialData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.value);

  const onDeleteItem = (date, dataID) => {
    onDeleteFinancialData(date, dataID);
  };

  const onUpdateItem = (dateID, dataUnitID, toBeUpdatedData) => {
    onUpdateFinancialData(dateID, dataUnitID, toBeUpdatedData);
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
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
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
          <button onClick={handleEditButton}>Edit</button>
          <button onClick={() => onDeleteItem(item.date, item.id)}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default FinanceDataListItem;
