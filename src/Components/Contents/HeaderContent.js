import styled from "styled-components";

import { Link } from "react-router-dom";

const HeaderContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.sizes.medium} 4px;
  font-size: 1.25em;

  @media (max-width: 768px){
    padding: 2.5rem 4px;
  }
`;

const LinkWrapper = styled(Link)`
  color: ${({theme}) => theme.colors.theme};
  font-weight: bold;
  font-size: 1.1em;
  margin-left: 1rem;

  &>span{
    color: ${({theme}) => theme.colors.themeSecondary};
  }
`;


const HeaderContent = ({ headerText }) => {
  return (
    <HeaderContentWrapper>
      <h1>{headerText}</h1>
      <LinkWrapper to="/lifemap/">life<span>map</span></LinkWrapper>
    </HeaderContentWrapper>
  );
};

export default HeaderContent;
