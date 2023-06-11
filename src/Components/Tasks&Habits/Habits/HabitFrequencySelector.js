import React, { useState } from 'react';
import styled from 'styled-components';

const FrequencyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const FrequencyLabelWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding:0 1rem;
  margin-top: 8px;
  border: 1px solid ${({theme})=> theme.colors.alternative};
  border-radius: ${({theme})=> theme.radius.large};
  box-shadow: ${({theme})=> theme.boxShadows.innerSmallShadow};

  &:hover{
    font-weight: bold;
  }

  > input {
    position: relative;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 14px;
    height: 14px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    outline: none;
    cursor: pointer;
  }

  > input:checked::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

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
    <FrequencyWrapper>
      <label>
        Habit Frequency
        {optionsToRender.map((option) => (
          <div key={option.value}>
            <FrequencyLabelWrapper>
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={handleOptionChange}
              />
              <span>{option.label}</span>
            </FrequencyLabelWrapper>
          </div>
        ))}
      </label>
    </FrequencyWrapper>
  );
};

export default HabitFrequencySelector;
