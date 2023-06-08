import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import TocIcon from '@mui/icons-material/Toc';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';

import NavToggleButton from "../Components/Wrappers/Styled-UI/NavToggleButton";

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
  color:${({theme}) => theme.colors.secondary} ;
  padding: ${({theme, isOpen}) => isOpen ?  theme.sizes.medium : theme.sizes.small};
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? "240px" : "60px")};
  border-radius: ${({theme}) => theme.radius.medium};

  transition: width 0.4s ease;
`;

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: ${({theme}) => theme.sizes.medium};
  padding: ${({theme}) => theme.sizes.small};
  text-decoration: none;
  cursor: pointer;
  color:${({theme}) => theme.colors.secondary};
  border-radius: ${({theme}) => theme.radius.medium};

  &:hover{
    color:${({theme}) => theme.colors.theme};
  }

  &.active {
    background-color: ${({theme}) => theme.colors.alternative};
    color:${({theme}) => theme.colors.theme};
  }
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavWrapper isOpen={isOpen}>
      <NavItemsWrapper>
        <NavItem to="/" activeClassName="active">
          <HomeIcon />
          {isOpen ? "Home" : ""}
        </NavItem>
        <NavItem to="edit-activity-unit" activeClassName="active">
          <AddCircleIcon />
          {isOpen ? "Add Activity Unit" : ""}
        </NavItem>
        <NavItem to="tasks-habits" activeClassName="active">
          <AssignmentIcon />
          {isOpen ? "Tasks & Habits" : ""}
        </NavItem>
        <NavItem to="finances" activeClassName="active">
          <MonetizationOnIcon />
          {isOpen ? "Finances" : ""}
        </NavItem>
        <NavItem to="view-activity-units" activeClassName="active">
          <TocIcon />
          {isOpen ? "View Activity Units" : ""}
        </NavItem>
        <NavItem to="charts" activeClassName="active">
          <BarChartIcon />
          {isOpen ? "Charts" : ""}
        </NavItem>
        <NavItem to="settings" activeClassName="active">
          <SettingsIcon />
          {isOpen ? "Settings" : ""}
        </NavItem>
      </NavItemsWrapper>
      <NavToggleButton onClick={toggleIsOpen} isOpen={isOpen} />
    </NavWrapper>
  );
};

export default NavBar;
