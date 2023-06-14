import styled from "styled-components";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GridOnIcon from '@mui/icons-material/GridOn';
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import NavToggleButton from "../Components/Wrappers/Styled-Elements/NavToggleButton";
import { NavWrapper } from "../Components/Wrappers/Styled-Wrappers/Navigation/NavWrapper";
import { NavItemWrapper } from "../Components/Wrappers/Styled-Wrappers/Navigation/NavItemWrapper";

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavWrapper isOpen={isOpen}>
      <NavItemsWrapper>
        <NavItemWrapper to="/lifemap/" activeClassName="active">
          <HomeIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Home
          </span>
        </NavItemWrapper>
        <NavItemWrapper to="/lifemap/edit-activity-unit" activeClassName="active">
          <AddCircleIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Add Activity Unit
          </span>
        </NavItemWrapper>
        <NavItemWrapper to="/lifemap/tasks-habits" activeClassName="active">
          <AssignmentIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Tasks & Habits
          </span>
        </NavItemWrapper>
        <NavItemWrapper to="/lifemap/finances" activeClassName="active">
          <MonetizationOnIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Finances
          </span>
        </NavItemWrapper>
        <NavItemWrapper to="/lifemap/view-activity-units" activeClassName="active">
          <GridOnIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            View Activity Units
          </span>
        </NavItemWrapper>
        <NavItemWrapper to="/lifemap/charts" activeClassName="active">
          <BarChartIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Charts
          </span>
        </NavItemWrapper>
        <NavItemWrapper to="/lifemap/settings" activeClassName="active">
          <SettingsIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Settings
          </span>
        </NavItemWrapper>
      </NavItemsWrapper>
      <NavToggleButton
        onClick={toggleIsOpen}
        isOpen={isOpen}
        id={"NavToggleButton"}
      />
    </NavWrapper>
  );
};

export default NavBar;
