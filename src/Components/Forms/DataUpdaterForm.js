import styled from "styled-components";

import Select from "react-select";
import SubCategorySelect from "./SubCategorySelect";

import { useEffect, useState } from "react";

const DataUpdaterFormWrapper = styled.div`
  border: 2px red solid;
`;

const DataUpdaterForm = ({ onUpdateData, categories, categoryOptions }) => {
  const selectedDate = new Date().toISOString().slice(0, 10);
  const [dateInputActive, setDateInputActive] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [subCategoryOptions, setSubCategoryOptions] = useState();

  let toBeUpdatedData = {};

  // Fetch the list of categories on mount and update the select dropdown options
  async function fetchCategories() {
    const selectedCategoryName = selectedCategory?.value;
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
    const dateInput = dateInputActive ? e.target['dateInput'].value : selectedDate;
    toBeUpdatedData = {
      date: dateInput,
      category: selectedCategory.value,
      subCategory: selectedSubCategory.value,
      value: e.target.valueInput.value,
    };
    onUpdateData(toBeUpdatedData);
  };

  // Handle selection of a category from the dropdown
  const categorySelectionHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategory(null);

    const category = categories.find(
      (item) => item.name === selectedCategory.value
    );
    setSubCategories(category.subCategories);
  };

  // Handle selection of a subcategory from the dropdown  
  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  const dateChangeHandler = () => {
    setDateInputActive(!dateInputActive);
  }

  return (
    <DataUpdaterFormWrapper>
      <form onSubmit={submitHandler}>
        {dateInputActive ? <input type="date" name="dateInput" defaultValue={selectedDate}></input> : selectedDate}
        <button onClick={dateChangeHandler}>{
          dateInputActive ? "select Today":"Select date"
        }</button>
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
        <button type="submit">Add</button>
      </form>
    </DataUpdaterFormWrapper>
  );
};

export default DataUpdaterForm;
