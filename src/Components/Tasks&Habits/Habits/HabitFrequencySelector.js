import React, { useState } from 'react';

const frequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
];

const HabitFrequencySelector = ({ onSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    onSelect(value);
  };


  const optionsToRender = frequencyOptions;

  return (
    <div>
      <label>
        Habit Frequency:
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
    </div>
  );
};

export default HabitFrequencySelector;
