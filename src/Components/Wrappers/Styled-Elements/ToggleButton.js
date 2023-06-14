import React, { useState } from "react";
import styled from "styled-components";

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 250px;
  min-width: 250px;
  margin: 0;
  padding: 1px;
  border-radius: ${({ theme }) => theme.radius.small};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
`;

const Button = styled.button`
  font-size: ${({ theme }) => theme.sizes.medium};
  transition: background-color 0.4s, color 0.4s;
  flex: 1;
  border: none;
  padding: 5px;
  background-color: ${({ active, theme }) =>
    active ? `${theme.colors.primary}` : `${theme.colors.alternative}`};
  color: ${({ active, theme }) =>
    active ? `${theme.colors.secondary}` : `${theme.colors.primary}`};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.small};
  white-space: nowrap;

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeSecondary};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.theme};
  }

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
