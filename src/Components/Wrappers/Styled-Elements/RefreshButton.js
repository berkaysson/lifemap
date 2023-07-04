import styled from "styled-components";
import RefreshIcon from '@mui/icons-material/Refresh';

const Wrapper = styled.i`
  cursor: pointer;
  display: inline-flex;
  border: 1px solid ${({theme})=> theme.colors.alternative};
  border-radius: ${({theme})=> theme.radius.large};
  padding: 5px;
  background-color: ${({theme})=> theme.colors.secomdary};

  &:hover {
    background-color: ${({theme})=> theme.colors.alternative};
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