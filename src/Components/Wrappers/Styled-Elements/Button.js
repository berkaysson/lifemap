import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${({theme}) => theme.colors.secondary};
  color: ${({theme}) => theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.alternative};
  border-radius: ${({theme}) => theme.radius.large};
  font-size: ${({theme}) => theme.sizes.medium};
  padding: ${({theme}) => theme.sizes.small} ${({theme}) => theme.sizes.medium};
  text-align: center;
  cursor: pointer;
  box-shadow: ${({theme}) => theme.boxShadows.smallCardShadow};

  &:hover{
    font-weight: bold;
  }

  &:active{
    border-color: ${({theme}) => theme.colors.primary};
    background-color:${({theme}) => theme.colors.theme};
  }
`;

const Button = ({ onClick, text, type, styeType }) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
