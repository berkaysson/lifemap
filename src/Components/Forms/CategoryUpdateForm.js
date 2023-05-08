import { useEffect, useState } from "react";

import Select from "react-select";

import styled from "styled-components";

const CategoryUpdateFormWrapper = styled.div`
  border: 4px aqua solid;
`

const CategoryUpdateForm = ({onGetAllCategories,onUpdateCategory,onDeleteSubCategory}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setselectedSubCategory] = useState(null);
  const [updateMode, setUpdateMode] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.name,
    category: category
  }));

  const subCategoryOptions = subCategories.map((subCategory) => {
    return {
      label:subCategory,
      value:subCategory,
      subCategory:subCategory
    }
  })

  useEffect(()=>{
    async function fetchCategories(){
      const newCategories = await onGetAllCategories();
      setCategories(newCategories);
    }
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const submitHandler = (event) => {
    event.preventDefault()
    const subCategoryInput = event.target["subCategoryInput"].value.trim();
    if (!subCategoryInput) {
      alert("Subcategory name cannot be empty");
      return;
    }
  
    if (subCategoryInput.length < 3 || subCategoryInput.length > 30) {
      alert("Subcategory name must be between 3 and 30 characters");
      return;
    }

    onUpdateCategory(selectedCategory.value, subCategoryInput);
  }

  const categorySelectHandler = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setselectedSubCategory(null);

    const category = categories.find((item) => item.name === selectedOption.value);
    setSubCategories(category.subCategories)
  }

  const subCategorySelectHandler = (selectedSubCategory) => {
    setselectedSubCategory(selectedSubCategory);
  }

  const updateClickHandler = () => {
    setUpdateMode("update");
  }

  const deleteClickHandler = () => {
    setUpdateMode("delete");
  }

  const cancelClickHandler = () => {
    setUpdateMode(null);
  }

  const deleteSubCategory = () => {
    onDeleteSubCategory(selectedCategory.value, selectedSubCategory.value);
  }

  const getFormContent = () => {
    if (updateMode == null) {
      return (
        <>
          <button type="button" onClick={updateClickHandler}>
            Update
          </button>
          <button type="button" onClick={deleteClickHandler}>
            Delete
          </button>
        </>
      );
    } else if (updateMode === "update") {
      return (
        <>
          <input type="text" name="subCategoryInput"></input>
          <button type="submit">Submit</button>
          <button type="button" onClick={cancelClickHandler}>
            Cancel
          </button>
        </>
      );
    } else if (updateMode === "delete") {
      return (
        <>
          {subCategories && subCategories.length > 0 ? (
            <>
              <Select 
                onChange={subCategorySelectHandler}
                options={subCategoryOptions}
                placeholder="Select a subCategory"
                value={selectedSubCategory}
              />
              <button type="button" onClick={deleteSubCategory}>Delete</button>
            </>
          ) : (
            <p>No subCategories found</p>
          )}

          <button type="button" onClick={cancelClickHandler}>
            Cancel
          </button>
        </>
      );
    }
  }

  return (
    <CategoryUpdateFormWrapper>
      <form onSubmit={submitHandler}>
        <Select
          value={selectedCategory}
          options={categoryOptions}
          onChange={categorySelectHandler}
          placeholder="--Select a category--"
        />

        {getFormContent()}
      </form>
    </CategoryUpdateFormWrapper>
  );
}

export default CategoryUpdateForm;