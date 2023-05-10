import styled from "styled-components";

import Select from "react-select";
import SubCategorySelect from "./SubCategorySelect";

import { useEffect, useState } from "react";

const DataUpdaterFormWrapper = styled.div`
  border: 2px red solid;
`

const DataUpdaterForm = ({onUpdateData, onGetAllCategories}) => {
  const selectedDate = (new Date().toISOString()).slice(0,10);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setselectedSubCategory] = useState(null);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState();

  let toBeUpdatedData = {};

  async function fetchCategories() {
    const newCategories = await onGetAllCategories();
    setCategories(newCategories);
    const selectedCategoryName = selectedCategory?.value;
    const category = newCategories.find(
      (item) => item.name === selectedCategoryName
    );
    setSubCategories(category?.subCategories ?? []);
  }

  useEffect(()=>{
    setCategoryOptions(() =>
        categories.map((category) => ({
          label: category.name,
          value: category.name,
          category: category,
        }))
      );

      setSubCategoryOptions(() =>
      subCategories.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
        subCategory: subCategory,
      })));
  },[categories, subCategories])

  useEffect(() => {
    fetchCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    toBeUpdatedData = {
      date:selectedDate,
      category: selectedCategory.value,
      subCategory: selectedSubCategory.value,
      value:e.target.valueInput.value
    }
    onUpdateData(toBeUpdatedData);
  }

  const categorySelectionHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setselectedSubCategory(null);

    const category = categories.find((item) => item.name === selectedCategory.value);
    setSubCategories(category.subCategories)
  }

  const subCategorySelectHandler = (selectedSubCategory) => {
    setselectedSubCategory(selectedSubCategory);
  }

  return (
    <DataUpdaterFormWrapper>
      <h4>Current Date: {selectedDate}</h4>
      <form onSubmit={submitHandler}>
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
        <button type="submit">Submit</button>
      </form>
    </DataUpdaterFormWrapper>
  );
}

export default DataUpdaterForm;