import { useState, useEffect } from "react";
import styled from "styled-components";

import Button from "../Wrappers/Styled-Elements/Button";
import ToggleButton from "../Wrappers/Styled-Elements/ToggleButton";
import CategorySubCategorySelect from "./CategorySubCategorySelect.js";
import FormWrapper from "../Wrappers/Styled-Wrappers/FormWrapper";
import { StyledSelect } from "../Wrappers/Styled-Elements/StyledSelect";
import StyledInput from "../Wrappers/Styled-Elements/StyledInput";
import { CardWrapper } from "../Wrappers/Styled-Wrappers/CardWrapper";

const CategoryUpdateFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};

  & > label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
`;

const DeleteCategoryFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};
`;

const CategoriesForm = ({
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formMode, setFormMode] = useState("update");
  const [subCategoryInput, setSubCategoryInput] = useState();
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [resetDeleteForm, setResetDeleteForm] = useState(false);

  // Handle form submission to update the category with a new subcategory
  const submitHandler = async (event) => {
    event.preventDefault();
    if(!selectedCategory){
      alert("Please Select an Activity Type");
      return;
    }

    if (!subCategoryInput) {
      alert("Subcategory name cannot be empty");
      return;
    }

    if (subCategoryInput.length < 3 || subCategoryInput.length > 30) {
      alert("Subcategory name must be between 3 and 30 characters");
      return;
    }

    await onUpdateCategory(selectedCategory.value, subCategoryInput);
    resetForm();
  };

  const resetForm = () => {
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setSubCategoryInput("");
    setResetDeleteForm(!resetDeleteForm);
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
    if(!selectedCategory){
      alert("Please Select an Activity Type");
      return;
    }

    if(!selectedSubCategory){
      alert("Please Select an Category");
      return;
    }

    await onDeleteSubCategory(
      selectedCategory.label,
      selectedCategory.value,
      selectedSubCategory.label
    );

    resetForm();
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
              <StyledSelect
                value={selectedCategory}
                options={categoryOptions}
                onChange={categorySelectHandler}
                placeholder="Select an Activity or Finance"
              />
              <StyledInput
                type="text"
                name="subCategoryInput"
                value={subCategoryInput}
                onChange={(event)=>{setSubCategoryInput(event.target.value)}}
                placeholder="Enter the name of the category"
              />
              <Button text={"Submit"} type={"submit"} />
            </FormWrapper>
          </>
        );
      case "delete":
        return (
          <CardWrapper>
            <DeleteCategoryFormWrapper>
              <form>
                <CategorySubCategorySelect
                  categories={categories}
                  onSubCategorySelect={subCategorySelectionHandler}
                  resetDeleteForm={resetDeleteForm}
                />
              </form>
              <Button
                text={"Delete"}
                type={"button"}
                onClick={deleteSubCategory}
              />
            </DeleteCategoryFormWrapper>
          </CardWrapper>
        );
      default:
        return null;
    }
  };

  return (
    <CardWrapper>
      <CategoryUpdateFormWrapper>
        <label>
          Do you want to Add or Delete a Category
          <ToggleButton
            onClick={formModeChangeHandler}
            options={[
              { label: "Add", value: "update" },
              { label: "Delete", value: "delete" },
            ]}
          />
        </label>
        {getFormContent()}
      </CategoryUpdateFormWrapper>
    </CardWrapper>
  );
};

export default CategoriesForm;
