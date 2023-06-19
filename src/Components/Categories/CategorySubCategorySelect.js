import { useState, useEffect } from "react";
import styled from "styled-components";

import SubCategorySelect from "../Wrappers/SubCategorySelect";
import { StyledSelect } from "../Wrappers/Styled-Elements/StyledSelect";

const CategorySubCategorySelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.sizes.medium};
  text-align: center;
`;

const CategorySubCategorySelect = ({ categories, onSubCategorySelect, resetDeleteForm=false }) => {
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

  useEffect(()=>{
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    fetchCategories();
    fetchCategoryOptions();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetDeleteForm]);

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
    <CategorySubCategorySelectWrapper>
      <div>
        <StyledSelect
          onChange={categorySelectionHandler}
          options={categoryOptions}
          placeholder="Select Activity Type"
          value={selectedCategory}
        />
      </div>
      <div>
        <SubCategorySelect
          placeholder={"Select a Category"}
          onChange={subCategorySelectHandler}
          options={subCategoryOptions}
          category={selectedCategory}
        />
      </div>
    </CategorySubCategorySelectWrapper>
  );
};

export default CategorySubCategorySelect;
