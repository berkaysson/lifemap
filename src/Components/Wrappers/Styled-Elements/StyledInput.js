import styled from "styled-components";

const StyledInputWrapper = styled.input`
  font-size: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.small}
    ${({ theme }) => theme.sizes.medium};
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.boxShadows.smallCardShadow};
  max-width: 200px;
  transition: background-color 0.3s, color 0.3s;
  text-align: center;

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeSecondary};
  }

  &::placeholder {
    font-size: 12px;
  }
`;

const StyledInput = (props) => {
  return <StyledInputWrapper {...props} />;
};

export default StyledInput;
