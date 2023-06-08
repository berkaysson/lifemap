import { useState, useEffect } from "react";
import styled from "styled-components";

import Select from "react-select";
import Button from "../Wrappers/Styled-Elements/Button";
import ToggleButton from "../Wrappers/Styled-Elements/ToggleButton";
import CategorySubCategorySelect from "./CategorySubCategorySelect.js";
import FormWrapper from "../Wrappers/Styled-Wrappers/FormWrapper";

const CategoryUpdateFormWrapper = styled.div``;

const CategoriesForm = ({
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formMode, setFormMode] = useState("update");
  const [categoryOptions, setCategoryOptions] = useState([]);

  // Handle form submission to update the category with a new subcategory
  const submitHandler = async (event) => {
    event.preventDefault();
    const subCategoryInput = event.target["subCategoryInput"].value.trim();
    if (!subCategoryInput) {
      alert("Subcategory name cannot be empty");
      return;
    }

    if (subCategoryInput.length < 3 || subCategoryInput.length > 30) {
      alert("Subcategory name must be between 3 and 30 characters");
      return;
    }

    await onUpdateCategory(selectedCategory.value, subCategoryInput);
  };

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
    fetchCategoryOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle selection of a category from the dropdown
  const categorySelectHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSelectedSubCategory(null);
  };

  //Handle formMode changes
  const formModeChangeHandler = (mode) => {
    setFormMode(mode);
  };

  // Handle deleting a subcategory
  const deleteSubCategory = async () => {
    await onDeleteSubCategory(
      selectedCategory.label,
      selectedCategory.value,
      selectedSubCategory.label
    );
  };

  const subCategorySelectionHandler = (category, subCategory) => {
    categorySelectHandler(category);
    setSelectedSubCategory(subCategory);
  };

  //render the appropriate form content based on the formMode state variable.
  const getFormContent = () => {
    switch (formMode) {
      case null:
        return (
          <>
            <span>Something Wrong</span>
          </>
        );
      case "update":
        return (
          <>
            <FormWrapper onSubmit={submitHandler}>
              <Select
                value={selectedCategory}
                options={categoryOptions}
                onChange={categorySelectHandler}
                placeholder="--Select a category--"
              />
              <input type="text" name="subCategoryInput"></input>
              <Button text={"Submit"} type={"submit"} />
            </FormWrapper>
          </>
        );
      case "delete":
        return (
          <>
            <form>
              <CategorySubCategorySelect
                categories={categories}
                onSubCategorySelect={subCategorySelectionHandler}
              />
            </form>
            <Button
              text={"Delete"}
              type={"button"}
              onClick={deleteSubCategory}
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <CategoryUpdateFormWrapper>
      <ToggleButton
        onClick={formModeChangeHandler}
        options={[
          { label: "Update", value: "update" },
          { label: "Delete", value: "delete" },
        ]}
      />
      {getFormContent()}
    </CategoryUpdateFormWrapper>
  );
};

export default CategoriesForm;
