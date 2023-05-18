import styled from "styled-components";

import Select from "react-select";
import SubCategorySelect from "../../Interfaces/SubCategorySelect";

import { useEffect, useState } from "react";

import Button from "../../Interfaces/Button";
import ToggleButton from "../../Interfaces/ToggleButton";

const DataUpdaterFormWrapper = styled.div`
`;

const ActiveButton = styled.button`
  opacity: 0.8;
  &.active {
    background-color: #000000;
    color: #ffffff;
    opacity: 1;
  }
`;

const DataUpdaterForm = ({ onUpdateData, categories, categoryOptions }) => {
  const selectedDate = new Date().toISOString().slice(0, 10);
  const [dateInputActive, setDateInputActive] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formMode, setFormMode] = useState("add");
  const [subCategoryOptions, setSubCategoryOptions] = useState();

  let toBeUpdatedData = {};

  // Fetch the list of categories on mount and update the select dropdown options
  async function fetchCategories() {
    const selectedCategoryName = selectedCategory?.name;
    const category = categories.find(
      (item) => item.name === selectedCategoryName
    );
    setSubCategories(category?.subCategories ?? []);
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
  }, [categories, subCategories]);

  // Handle form submission to update data with toBeUpdatedData object
  const submitHandler = async (e) => {
    e.preventDefault();
    const dateInput = dateInputActive
      ? e.target["dateInput"].value
      : selectedDate;
    const valueInput = e.target.valueInput.value;
    if (valueInput < 0) {
      alert("Value can not be smaller than 0");
      return;
    }
    toBeUpdatedData = {
      date: dateInput,
      category: selectedCategory.label,
      subCategory: selectedSubCategory.value,
      value: valueInput,
      formMode: formMode,
    };
    onUpdateData(toBeUpdatedData);
  };

  // Handle selection of a category from the dropdown
  const categorySelectionHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategory(null);

    const category = categories.find(
      (item) => item.id === selectedCategory.value
    );
    setSubCategories(category.subCategories);
  };

  // Handle selection of a subcategory from the dropdown
  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  const dateChangeHandler = () => {
    setDateInputActive(!dateInputActive);
  };

  const formModeChangeHandler = (mode) => {
    setFormMode(mode);
  };

  return (
    <DataUpdaterFormWrapper>
      <form onSubmit={submitHandler}>
        <label>Date:</label>
        {dateInputActive ? (
          <input
            type="date"
            name="dateInput"
            defaultValue={selectedDate}
          ></input>
        ) : (
          selectedDate
        )}
        <ToggleButton
          onClick={dateChangeHandler}
          options={[
            { value: "today", label: "Today" },
            { value: "other", label: "Select Date" },
          ]}
        />
        <label>Select Updated Category</label>
        <Select
          onChange={categorySelectionHandler}
          options={categoryOptions}
          placeholder="--Select a category--"
          value={selectedCategory}
        />
        <label>Select SubCategory</label>
        <SubCategorySelect
          placeholder={"--Select a subCategory--"}
          onChange={subCategorySelectHandler}
          options={subCategoryOptions}
          category={selectedCategory}
        />
        <label>Enter the value</label>
        <input type="number" name="valueInput"></input>
        <div>
        <label>Do you want to add the value or delete</label>
          <ToggleButton
            onClick={formModeChangeHandler}
            options={[
              { value: "add", label: "Add" },
              { value: "delete", label: "Delete" },
            ]}
          />
        </div>
        <Button text={"Submit"} type={"submit"} />
      </form>
    </DataUpdaterFormWrapper>
  );
};

export default DataUpdaterForm;
