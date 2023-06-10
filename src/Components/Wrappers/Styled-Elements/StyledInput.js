import styled from "styled-components"

const StyledInputWrapper = styled.input`
  font-size: ${({theme}) => theme.sizes.medium};
  padding: ${({theme}) => theme.sizes.small} ${({theme}) => theme.sizes.medium};
  border: 1px solid ${({theme}) => theme.colors.alternative};
  border-radius: ${({theme}) => theme.radius.large};
  box-shadow: ${({theme}) => theme.boxShadows.smallCardShadow};
  max-width: 200px;
  transition: background-color 0.4s, color 0.4s;

  &:hover{
    font-weight: bold;
  }
`

const StyledInput = (props) => {
  return (<StyledInputWrapper {...props} />)
}

export default StyledInput