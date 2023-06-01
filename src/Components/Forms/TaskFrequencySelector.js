import React, { useState } from 'react';

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'semi-year', label: 'Semi -Yearly' },
  { value: 'yearly', label: 'Yearly' },
];

const TaskFrequencySelector = ({ onSelect }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('daily');

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    onSelect(value);
  };

  const handleToggleOptions = () => {
    setShowMoreOptions(!showMoreOptions);
    setSelectedOption('daily');
  };

  const optionsToRender = showMoreOptions ? frequencyOptions : frequencyOptions.slice(0, 3);

  return (
    <div>
      <label>
        Task Frequency:
        {optionsToRender.map((option) => (
          <div key={option.value}>
            <label>
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
              />
              {option.label}
            </label>
          </div>
        ))}
      </label>
      <button onClick={handleToggleOptions}>
        {showMoreOptions ? 'Less' : 'More'}
      </button>
    </div>
  );
};

export default TaskFrequencySelector;
