import { useState } from "react";
import styled from "styled-components";

import Button from "../Wrappers/Styled-Elements/Button";

const ListItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadows.innerSmallShadow};
  padding: ${({ theme }) => theme.sizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.small};
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`

const DateWrapper = styled.h4`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: ${({ theme }) => theme.sizes.small};
`;

const PriceWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: ${({ theme }) => theme.sizes.small};
  width: 75px;
  text-align: start;
  white-space: nowrap;
  background-color:${({ formMode, theme }) => formMode === "income" ? 
  theme.colors.success:theme.colors.danger} ;
  color: ${({ theme }) => theme.colors.primary};
`;

const ButtonsWrapper = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.alternative};
  padding-left: 2rem;

  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.sizes.small};
`

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
    <ListItemWrapper id={item.id}>
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
          <HeaderWrapper>
            <DateWrapper>
              {item.date} {item.time}
            </DateWrapper>
            <div>{item.subCategory}</div>
          </HeaderWrapper>
          <ContentWrapper>
            <PriceWrapper formMode={item.formMode}>
              {item.formMode === "income" ? "+" : "-"} {item.value}
            </PriceWrapper>
            <ButtonsWrapper>
              <Button type="button" text={"Edit"} onClick={handleEditButton} />
              <Button
                type="button"
                text={"Delete"}
                onClick={() => onDeleteItem(item.date, item.id)}
              />
            </ButtonsWrapper>
          </ContentWrapper>
        </>
      )}
    </ListItemWrapper>
  );
};

export default FinanceDataListItem;
