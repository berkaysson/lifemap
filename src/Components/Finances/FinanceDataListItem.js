import { useState } from "react";
import styled from "styled-components";

import Button from "../Wrappers/Styled-Elements/Button";
import StyledInput from "../Wrappers/Styled-Elements/StyledInput";

const ListItemWrapper = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: ${({ theme }) => theme.boxShadows.innerSmallShadow};
  padding: ${({ theme }) => theme.sizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.sizes.small};
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.sizes.small};
  font-weight: bold;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const DateWrapper = styled.h4`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: ${({ theme }) => theme.sizes.small};
  width: 150px;
  text-align: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.sizes.small};
  width: 100%;

  @media (max-width: 1024px) {
    padding: ${({ theme }) => theme.sizes.small};
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const PriceWrapper = styled.div`
  display: flex;
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.small};
  padding: ${({ theme }) => theme.sizes.small};
  text-align: start;
  white-space: nowrap;
  background-color: ${({ formMode, theme }) =>
    formMode === "income" ? theme.colors.success : theme.colors.danger};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;

  & > div {
    padding-right: 10px;
    margin-right: 10px;
    border-right: 1px solid ${({ theme }) => theme.colors.theme};

    @media (max-width: 1024px) {
      margin-right: 20px;
    }
  }

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
`;

const ButtonsWrapper = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.alternative};
  padding-left: 0.7rem;
  display: flex;
  flex-direction: row;
  gap: 5px;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    width: 100%;
    border: none;
    padding-left: 0;
  }
`;

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

    if (!updatedData.value || updatedData.value < 0) {
      alert("Enter a positive value");
      return;
    }
    onUpdateItem(item.date, item.id, updatedData);
    setIsEditing(false);
  };

  return (
    <ListItemWrapper id={item.id}>
      {isEditing ? (
        <>
          {" "}
          <div style={{margin:"1rem"}}>
            <h4>{item.category}</h4>
            <h4>{item.subCategory}</h4>
          </div>
          <StyledInput
            type="number"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={{margin:"0.4rem"}}
          />
          <ButtonsWrapper>
            <Button type="button" text={"Save"} onClick={handleSaveEdit} />
            <Button type="button" text={"Cancel"} onClick={handleCancelEdit} />
          </ButtonsWrapper>
        </>
      ) : (
        <>
          <HeaderWrapper>
            <DateWrapper>
              {item.date} {item.time}
            </DateWrapper>
          </HeaderWrapper>
          <ContentWrapper>
            <PriceWrapper formMode={item.formMode}>
              <div>{item.subCategory}</div>
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
