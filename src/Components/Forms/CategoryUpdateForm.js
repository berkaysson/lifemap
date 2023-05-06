import { useEffect, useState } from "react";
import styled from "styled-components";

const CategoryUpdateFormWrapper = styled.div`
  border: 4px aqua solid;
`

const CategoryUpdateForm = ({onGetAllCategories,onUpdateCategory,onDeleteSubCategory}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedSubCategory, setselectedSubCategory] = useState(null);
  const [updateMode, setUpdateMode] = useState(null);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(()=>{
    async function fetchCategories(){
      const newCategories = await onGetAllCategories();
      setCategories(newCategories);
    }
    fetchCategories();
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

    onUpdateCategory(selectedCategory, subCategoryInput);
  }

  const categorySelectHandler = (event) => {
    setSelectedCategory(event.target.value);

    const category = categories.find((item) => item.name === event.target.value);
    setSubCategories(category.subcategories)
  }

  const subCategorySelectHandler = (event) => {
    setselectedSubCategory(event.target.value);
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
    onDeleteSubCategory(selectedCategory,selectedSubCategory);
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
              <select onChange={subCategorySelectHandler}>
                <option disabled>Select a subCategory</option>
                {subCategories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
              <button type="button" onClick={deleteSubCategory}>Delete</button>
            </>
          ) : (
            <p>No subcategories found</p>
          )}

          <button type="button" onClick={cancelClickHandler}>
            Cancel
          </button>
        </>
      );
    }
  }

  return <CategoryUpdateFormWrapper>
    <form onSubmit={submitHandler}>
      <select onChange={categorySelectHandler}>
        <option disabled>--Select a category--</option>
        {
          categories.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)
        }
      </select>

      {getFormContent()}
    </form>
  </CategoryUpdateFormWrapper>
}

export default CategoryUpdateForm;