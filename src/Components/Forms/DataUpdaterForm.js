import styled from "styled-components";

import { useEffect, useState } from "react";

const DataUpdaterFormWrapper = styled.div`
  border: 2px red solid;
`

const DataUpdaterForm = ({onUpdateData, onGetAllCategories}) => {
  const selectedDate = (new Date().toISOString()).slice(0,10);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Study');
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setselectedSubCategory] = useState(null);

  let toBeUpdatedData = {};

  useEffect(()=>{
    async function fetchCategories(){
      const newCategories = await onGetAllCategories();
      setCategories(newCategories);
    }
    fetchCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const submitHandler = (e) => {
    e.preventDefault();
    toBeUpdatedData = {
      date:selectedDate,
      category: selectedCategory,
      subCategory: selectedSubCategory,
      value:e.target.valueInput.value
    }
    onUpdateData(toBeUpdatedData);
  }

  const categorySelectionHandler = (event) => {
    setSelectedCategory(event.target.value);

    const category = categories.find((item) => item.name === event.target.value);
    setSubCategories(category.subCategories)
  }

  const subCategorySelectHandler = (event) => {
    setselectedSubCategory(event.target.value);
  }

  return (
    <DataUpdaterFormWrapper>
      <h4>Current Date: {selectedDate}</h4>
      <form onSubmit={submitHandler}>
        <label>Select Updated Category</label>
        <select onChange={categorySelectionHandler}>
          <option disabled>--Select a Category--</option>
          {categories.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <label>Select SubCategory</label>
          {subCategories && subCategories.length > 0 ? (
            <>
              <select onChange={subCategorySelectHandler}>
                <option disabled>Select a subCategory</option>
                {subCategories.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </>
          ) : (
            <p>No subCategories found</p>
          )}
        <label>Enter the value</label>
        <input type="number" name="valueInput"></input>
        <button type="submit">Submit</button>
      </form>
    </DataUpdaterFormWrapper>
  );
}

export default DataUpdaterForm;