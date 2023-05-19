import Button from "../../Interfaces/Button";
import ToggleButton from "../../Interfaces/ToggleButton";
import SubCategorySelect from "../../Interfaces/SubCategorySelect";

import styled from "styled-components";

import { useState, useEffect } from "react";

const Wrapper = styled.div`
  border: 1px solid red;
`;

const ExpensesUpdaterForm = ({
  onUpdateData,
  onDeleteData,
  expenseCategory,
}) => {
  const date = new Date().toISOString().slice(0, 10);
  const time = new Date().getHours() + ":" + new Date().getMinutes();

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [dateInputActive, setDateInputActive] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [formMode, setFormMode] = useState("add");

  let toBeUpdatedData = {};

    // Fetch the list of categories on mount and update the select dropdown options
    async function fetchCategories() {
      setSubCategories(expenseCategory?.subCategories ?? []);
    }
  
    useEffect(() => {
      fetchCategories();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    // Update the select dropdown options when the subCategories change
    useEffect(() => {
      setSubCategoryOptions(() =>
        subCategories.map((subCategory) => ({
          label: subCategory,
          value: subCategory,
          subCategory: subCategory,
        }))
      );
    }, [expenseCategory, subCategories]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const dateInput = dateInputActive ? e.target["dateInput"].value : date;
    const valueInput = e.target.expenseValue.value;
    if (valueInput < 0) {
      alert("Value can not be smaller than 0");
      return;
    }
    toBeUpdatedData = {
      date: dateInput,
      category: "Expense",
      subCategory: selectedSubCategory.value,
      value: valueInput,
      formMode: formMode,
    };
    console.log(toBeUpdatedData)
    onUpdateData(toBeUpdatedData);
  };

  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  const dateChangeHandler = () => {
    setDateInputActive(!dateInputActive);
  };

  const formModeChangeHandler = (mode) => {
    setFormMode(mode)
  }

  return (
    <Wrapper>
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
      <form onSubmit={submitHandler}>
        <SubCategorySelect
          options={subCategoryOptions}
          placeholder="--Select a expense category--"
          value={selectedSubCategory}
          onChange={subCategorySelectHandler}
        />
        <label>Do you want to add the value or delete</label>
        <ToggleButton
          onClick={formModeChangeHandler}
          options={[
            { value: "add", label: "Income" },
            { value: "delete", label: "Expense" },
          ]}
        />
        <input type="number" name="expenseValue" />
        <Button text={"Submit"} type={"submit"} />
      </form>
    </Wrapper>
  );
};

export default ExpensesUpdaterForm;
