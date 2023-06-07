import React, { useState } from "react";
import styled from "styled-components";

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  margin: 0;
`;

const Button = styled.button`
  transition: all 0.3s ease;
  flex: 1;
  border: none;
  padding: 5px;
  background-color: ${({ active }) => (active ? "#2ecc71" : "gray")};
  color: white;
  font-weight: bold;
  cursor: pointer;
  letter-spacing: ${({ active }) => (active ? "3px" : "normal")};
  border-radius: 1rem;

  &:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

const ToggleButton = ({ onClick, options }) => {
  const [activeOption, setActiveOption] = useState(options[0].value);

  const handleButtonClick = (option) => {
    setActiveOption(option);
    onClick(option);
  };

  return (
    <SwitchWrapper>
      {options.map((option) => (
        <Button
          type="button"
          key={option.value}
          active={activeOption === option.value}
          onClick={() => handleButtonClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </SwitchWrapper>
  );
};

export default ToggleButton;
