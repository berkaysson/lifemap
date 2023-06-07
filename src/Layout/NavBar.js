import styled from "styled-components";

import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 10px;
  height: 100%;
  border: 1px red solid;
  width: ${({ isOpen }) => (isOpen ? "240px" : "60px")};
`;

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid green;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  border: 1px black solid;

  &.active {
    text-decoration: underline;
    font-style: italic;
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavWrapper isOpen={isOpen}>
      <button onClick={toggleIsOpen}>Toggle</button>
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
