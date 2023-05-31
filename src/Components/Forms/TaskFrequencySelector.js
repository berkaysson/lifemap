import React, { useState } from 'react';

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'biweekly', label: 'Biweekly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'yearly', label: 'Yearly' },
];

const TaskFrequencySelector = ({ onSelect }) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    onSelect(value);
  };

  const handleToggleOptions = () => {
    setShowMoreOptions(!showMoreOptions);
    setSelectedOption('');
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
