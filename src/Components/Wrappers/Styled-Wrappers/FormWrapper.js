import styled from "styled-components";

const StyledFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius:${({ theme }) => theme.radius.medium};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  text-align: center;
`

const FormWrapper = ({ onSubmit, children }) => {
  const submitHandler = (event) => {
    event.preventDefault();
    onSubmit(event);
  }

  return(<StyledFormWrapper onSubmit={submitHandler} id="form">
    {children}
  </StyledFormWrapper>)
};

export default FormWrapper;
