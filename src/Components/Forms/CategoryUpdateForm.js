import { useEffect, useState } from "react";

import Select from "react-select";
import SubCategorySelect from "../../Interfaces/SubCategorySelect";

import Button from "../../Interfaces/Button";

import styled from "styled-components";
import ToggleButton from "../../Interfaces/ToggleButton";

const CategoryUpdateFormWrapper = styled.div`
  border: 4px aqua solid;
`;

const CategoryUpdateForm = ({
  onUpdateCategory,
  onDeleteSubCategory,
  categories,
  categoryOptions,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [formMode, setFormMode] = useState("update");
  const [subCategories, setSubCategories] = useState([]);

  const [subCategoryOptions, setSubCategoryOptions] = useState();

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
    fetchCategories();
  };

  // Handle selection of a category from the dropdown
  const categorySelectHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSelectedSubCategory(null);

    const category = categories.find(
      (item) => item.id === selectedOption.value
    );
    setSubCategories(category.subCategories);
  };

  // Handle selection of a subcategory from the dropdown
  const subCategorySelectHandler = (selectedSubCategory) => {
    setSelectedSubCategory(selectedSubCategory);
  };

  //Handle formMode changes
  const updateClickHandler = () => {
    setFormMode("update");
  };

  const deleteClickHandler = () => {
    setFormMode("delete");
  };

  const cancelClickHandler = () => {
    setFormMode(null);
  };

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
    fetchCategories();
  };

  //render the appropriate form content based on the formMode state variable.
  const getFormContent = () => {
    switch (formMode) {
      case null:
        return (
          <>
          </>
        );
      case "update":
        return (
          <>
            <form onSubmit={submitHandler}>
              <Select
                value={selectedCategory}
                options={categoryOptions}
                onChange={categorySelectHandler}
                placeholder="--Select a category--"
              />
              <input type="text" name="subCategoryInput"></input>
              <Button text={"Submit"} type={"submit"} />
            </form>
          </>
        );
      case "delete":
        return (
          <>
            <form onSubmit={submitHandler}>
              <Select
                value={selectedCategory}
                options={categoryOptions}
                onChange={categorySelectHandler}
                placeholder="--Select a category--"
              />
            </form>
            <SubCategorySelect
              onChange={subCategorySelectHandler}
              options={subCategoryOptions}
              placeholder={"Select a subCategory"}
              category={selectedCategory}
            />
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

export default CategoryUpdateForm;
