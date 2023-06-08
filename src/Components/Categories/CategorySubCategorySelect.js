import { useState, useEffect } from "react";

import Select from "react-select";
import SubCategorySelect from "../Wrappers/SubCategorySelect";
import { StyledSelect } from "../Wrappers/Styled-Elements/StyledSelect";

const CategorySubCategorySelect = ({ categories, onSubCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);

  async function fetchCategories() {
    const selectedCategoryName = selectedCategory?.name;
    const category = categories.find(
      (item) => item.name === selectedCategoryName
    );
    setSubCategories(category?.subCategories ?? []);
  }

  async function fetchCategoryOptions() {
    setCategoryOptions(() =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
        subCategories: category.subCategories,
      }))
    );
    console.log("Category options assigned successfully");
  }

  useEffect(() => {
    fetchCategories();
    fetchCategoryOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSubCategoryOptions(() =>
      subCategories.map((subCategory) => ({
        label: subCategory,
        value: subCategory,
        subCategory: subCategory,
      }))
    );
  }, [categories, subCategories]);

  const categorySelectionHandler = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setSelectedSubCategory(null);

    const category = categories.find(
      (item) => item.id === selectedCategory.value
    );
    setSubCategories(category.subCategories);
  };

  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
    onSubCategorySelect(selectedCategory, selectedSubCategory);
  };

  return (
    <div>
      <label>Select Category</label>
      <StyledSelect
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
    </div>
  );
};

export default CategorySubCategorySelect;
