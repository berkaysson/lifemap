import styled from "styled-components";

const HeaderContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({theme}) => theme.sizes.medium} 4px;
  font-size: 1.25em;
`

const HeaderContent = ({ headerText }) => {
  return(
    <HeaderContentWrapper>
      <h1>{headerText}</h1>
      <a href="/">lifemap</a>
    </HeaderContentWrapper>
  )
};

export default HeaderContent;
