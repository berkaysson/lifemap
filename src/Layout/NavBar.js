import styled from "styled-components";

import { NavLink } from "react-router-dom";

const NavWrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #f2f2f2;
  padding: 10px;
`;

const NavItem = styled(NavLink)`
  margin-right: 10px;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;

  &.active {
    text-decoration: underline;
    font-style: italic;
  }
`;

const NavBar = () => {
  return (
    <NavWrapper>
      <NavItem to="/" activeClassName="active">
        Home
      </NavItem>
      <NavItem to="edit-activity-unit" activeClassName="active">
        Add Activity Unit
      </NavItem>
      <NavItem to="tasks-habits" activeClassName="active">
        Tasks & Habits
      </NavItem>
      <NavItem to="finances" activeClassName="active">
        Finances
      </NavItem>
      <NavItem to="view-activity-units" activeClassName="active">
        View Activity Units
      </NavItem>
      <NavItem to="charts" activeClassName="active">
        Charts
      </NavItem>
      <NavItem to="settings" activeClassName="active">
        Settings
      </NavItem>
    </NavWrapper>
  );
};

export default NavBar;
