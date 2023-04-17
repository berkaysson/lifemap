import React, { useState } from 'react';
import categoryData from '../../Data/categoryData.json';

const DataForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    study: {},
    sport: {},
    game: {},
    expense: { amount: 0 },
    date: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value, id: value }));
  };

  const handleCategoryChange = (categoryName, event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [categoryName]: { ...prevData[categoryName], [name]: value },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const renderCategoryOptions = (categoryName) =>
    categoryData[`${categoryName}Categories`].map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ));

  const renderCategoryInput = (categoryName, inputType) => (
    <div>
      <label htmlFor={categoryName}>{categoryName}:</label>
      <select id={categoryName} name={categoryName} onChange={(event) => handleCategoryChange(categoryName, event)}>
        <option value="">--Select--</option>
        {renderCategoryOptions(categoryName)}
      </select>
      <input
        type={inputType}
        id={`${categoryName}${inputType}`}
        name={`${categoryName}${inputType}`}
        value={formData[categoryName][formData[categoryName]] || ""}
        onChange={(event) => handleCategoryChange(categoryName, event)}
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
      </div>
      {renderCategoryInput("study", "Amount")}
      {renderCategoryInput("sport", "Activity")}
      {renderCategoryInput("game", "Game")}
      <div>
        <label htmlFor="expense">Expense:</label>
        <input
          type="number"
          id="expenseAmount"
          name="expenseAmount"
          value={formData.expense.amount}
          onChange={(event) =>
            setFormData((prevData) => ({
              ...prevData,
              expense: { amount: parseInt(event.target.value) },
            }))
          }
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DataForm;
