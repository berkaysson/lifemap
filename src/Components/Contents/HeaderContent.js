import styled from "styled-components";

import { Link } from "react-router-dom";

const HeaderContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.medium} 4px;
  font-size: 1.25em;
`;

const LinkWrapper = styled(Link)`
  color: ${({theme}) => theme.colors.theme};
  font-weight: bold;
  font-size: 1.1em;

  &>span{
    color: ${({theme}) => theme.colors.themeSecondary};
  }
`;


const HeaderContent = ({ headerText }) => {
  return (
    <HeaderContentWrapper>
      <h1>{headerText}</h1>
      <LinkWrapper to="/">life<span>map</span></LinkWrapper>
    </HeaderContentWrapper>
  );
};

export default HeaderContent;
