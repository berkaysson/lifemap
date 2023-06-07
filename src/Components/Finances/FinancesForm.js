import styled from "styled-components";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../Wrappers/Styled-UI/Button";
import ToggleButton from "../Wrappers/Styled-UI/ToggleButton";
import SubCategorySelect from "../Wrappers/SubCategorySelect";

const Wrapper = styled.div`
  border: 1px solid red;
`;

const FinancesForm = ({
  expenseCategory,
  incomeCategory,
  onAddFinancialDataUnit,
}) => {
  const date = new Date().toISOString().slice(0, 10);
  const time =
    new Date().getHours().toString().padStart(2, "0") +
    ":" +
    new Date().getMinutes().toString().padStart(2, "0");

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [dateInputActive, setDateInputActive] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [formMode, setFormMode] = useState("expense");

  let toBeUpdatedData = {};

  async function fetchCategories() {
    setSubCategories(expenseCategory?.subCategories ?? []);
  }

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (formMode === "expense")
      setSubCategories(expenseCategory?.subCategories ?? []);
    if (formMode === "income")
      setSubCategories(incomeCategory?.subCategories ?? []);
    setSubCategoryOptions(() =>
      subCategories.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
        subCategory: subCategory,
      }))
    );
  }, [expenseCategory, subCategories, incomeCategory, formMode]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const dateInput = dateInputActive ? e.target.dateInput.value : date;
    const valueInput = e.target.expenseValue.value;
    if (valueInput < 0) {
      alert("Value can not be smaller than 0");
      return;
    }
    toBeUpdatedData = {
      date: dateInput,
      time: time,
      category: "Expense",
      subCategory: selectedSubCategory.value,
      value: valueInput,
      formMode: formMode,
      id: uuidv4(),
    };
    onAddFinancialDataUnit(toBeUpdatedData);
    setSelectedSubCategory(null);
  };

  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  const dateChangeHandler = () => {
    setDateInputActive(!dateInputActive);
  };

  const formModeChangeHandler = (mode) => {
    setFormMode(mode);
    setSelectedSubCategory(null);
  };

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <label>Date:</label>
        {dateInputActive ? (
          <input type="date" name="dateInput" defaultValue={date}></input>
        ) : (
          date
        )}
        <ToggleButton
          onClick={dateChangeHandler}
          options={[
            { value: "today", label: "Today" },
            { value: "other", label: "Select Date" },
          ]}
        />
        <SubCategorySelect
          options={subCategoryOptions}
          placeholder={`--Select a ${formMode} category--`}
          value={selectedSubCategory}
          onChange={subCategorySelectHandler}
        />
        <ToggleButton
          onClick={formModeChangeHandler}
          options={[
            { value: "expense", label: "Expense" },
            { value: "income", label: "Income" },
          ]}
        />
        <input type="number" name="expenseValue" />
        <Button text={"Submit"} type={"submit"} />
      </form>
    </Wrapper>
  );
};

export default FinancesForm;
