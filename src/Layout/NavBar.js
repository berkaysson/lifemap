import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.primary};
  color:${({theme}) => theme.colors.secondary} ;
  padding: ${({theme}) => theme.sizes.medium};
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? "240px" : "60px")};
`;

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(NavLink)`
  font-size: ${({theme}) => theme.sizes.medium};
  padding: ${({theme}) => theme.sizes.small};
  text-decoration: none;
  cursor: pointer;
  color:${({theme}) => theme.colors.secondary};

  &:hover{
    color:${({theme}) => theme.colors.theme};
  }

  &.active {
    background-color: ${({theme}) => theme.colors.alternative};
    color:${({theme}) => theme.colors.theme};
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavWrapper isOpen={isOpen}>
      <button onClick={toggleIsOpen}>T</button>
      <NavItemsWrapper>
        <NavItem to="/" activeClassName="active">
          <i>H</i>
          {isOpen ? "Home" : ""}
        </NavItem>
        <NavItem to="edit-activity-unit" activeClassName="active">
          <i>A</i>
          {isOpen ? "Add Activity Unit" : ""}
        </NavItem>
        <NavItem to="tasks-habits" activeClassName="active">
          <i>T</i>
          {isOpen ? "Tasks & Habits" : ""}
        </NavItem>
        <NavItem to="finances" activeClassName="active">
          <i>F</i>
          {isOpen ? "Finances" : ""}
        </NavItem>
        <NavItem to="view-activity-units" activeClassName="active">
          <i>V</i>
          {isOpen ? "View Activity Units" : ""}
        </NavItem>
        <NavItem to="charts" activeClassName="active">
          <i>C</i>
          {isOpen ? "Charts" : ""}
        </NavItem>
        <NavItem to="settings" activeClassName="active">
          <i>S</i>
          {isOpen ? "Settings" : ""}
        </NavItem>
      </NavItemsWrapper>
    </NavWrapper>
  );
};

export default NavBar;
