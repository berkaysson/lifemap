import styled from "styled-components";

import categoryData from "../../Data/categoryData.json";

import { useEffect, useState } from "react";


const studyCategories = categoryData.studyCategories;
const sportCategories = categoryData.sportCategories;
const gameCategories = categoryData.gameCategories;
const expenseCategories = categoryData.expenseCategories;

const MAIN_CATEGORIES = [
  { value: 'studyData', label: 'Study' },
  { value: 'sportData', label: 'Sport' },
  { value: 'gameData', label: 'Game' },
  { value: 'expenseData', label: 'Expense' }
];

const DataUpdaterFormWrapper = styled.div`
  border: 2px red solid;
`

const DataUpdaterForm = ({onUpdateData}) => {
  const selectedDate = (new Date().toISOString()).slice(0,10);
  const [selectedCategory, setSelectedCategory] = useState('Study');
  const [subCategories, setSubCategories] = useState(studyCategories);
  const [selectedSubCategory, setSelectedSubCategory] = useState('non');

  let toBeUpdatedData = {};

  useEffect(()=>{
    switch (selectedCategory) {
      case 'studyData':
        setSubCategories(studyCategories);
        return
      case 'sportData':
        setSubCategories(sportCategories);
        return
      case 'gameData':
        setSubCategories(gameCategories);
        return
      case 'expenseData':
        setSubCategories(expenseCategories);
        return
      default:
        return undefined;
    }
  }, [selectedCategory]);

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
  }

  const subCategorySelectionHandler = (event) => {
    setSelectedSubCategory(event.currentTarget.value);
  }

  return (
    <DataUpdaterFormWrapper>
      <h4>Current Date: {selectedDate}</h4>
      <form onSubmit={submitHandler}>
        <label>Select Updated Category</label>
        <select onChange={categorySelectionHandler}>
          {MAIN_CATEGORIES.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
        </select>
        <label>Select SubCategory</label>
        <select onChange={subCategorySelectionHandler}>
          {
            subCategories.map((item, index) => <option key={index} value={item}>{item}</option>)
          }
        </select>
        <label>Enter the value</label>
        <input type="number" name="valueInput"></input>
        <button type="submit">Submit</button>
      </form>
    </DataUpdaterFormWrapper>
  )
}

export default DataUpdaterForm;