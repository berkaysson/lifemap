import styled from "styled-components";
import RefreshIcon from '@mui/icons-material/Refresh';

const Wrapper = styled.i`
  cursor: pointer;
  display: inline-flex;
  border: 1px solid ${({theme})=> theme.colors.secondary};
  border-radius: ${({theme})=> theme.radius.large};
  padding: 5px;
  background-color: ${({theme})=> theme.colors.secondary};
  transition: 0.2s transform ease;
  box-shadow: ${({theme})=> theme.boxShadows.innerSmallShadow};

  &:hover {
    background-color: ${({theme})=> theme.colors.alternative};
    transform: rotate(90deg);
  }

  &:active {
    border-color: ${({theme})=> theme.colors.theme};
  }
`

const RefreshButton = ( {fetchUpdateHandler} ) => {
  return <Wrapper onClick={fetchUpdateHandler}>
    <RefreshIcon />
  </Wrapper>
}

export default RefreshButton;