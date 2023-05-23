import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px;
  background-color: ${props => props.styeType === 'primary' ? 'blue' : 'gray'};
  color: white;
  border: none;
  cursor: pointer;
`;

const Button = ({ onClick, text, type, styeType }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
