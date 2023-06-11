import styled from "styled-components";

import {CardWrapper} from "./CardWrapper.js"

const StyledFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};
  text-align: center;
`

const FormWrapper = ({ onSubmit, children, disableBoxShadow=false }) => {
  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(event);
  }

  return(
  <CardWrapper disableBoxShadow={disableBoxShadow}>
  <StyledFormWrapper disableBoxShadow={disableBoxShadow} onSubmit={submitHandler} id="form">
    {children}
  </StyledFormWrapper>
  </CardWrapper>)
};

export default FormWrapper;
