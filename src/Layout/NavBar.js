import styled from "styled-components";
import { useState } from "react";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import TocIcon from "@mui/icons-material/Toc";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import NavToggleButton from "../Components/Wrappers/Styled-Elements/NavToggleButton";
import { NavWrapper } from "../Components/Wrappers/Styled-Wrappers/Navigation/NavWrapper";
import { NavItemWrapper } from "../Components/Wrappers/Styled-Wrappers/Navigation/NavItemWrapper";

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  width: 100%;
`;

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavWrapper isOpen={isOpen}>
      <NavItemsWrapper>
        <NavItemWrapper to="/" activeClassName="active">
          <HomeIcon />
          {isOpen ? "Home" : ""}
        </NavItemWrapper>
        <NavItemWrapper to="edit-activity-unit" activeClassName="active">
          <AddCircleIcon />
          {isOpen ? "Add Activity Unit" : ""}
        </NavItemWrapper>
        <NavItemWrapper to="tasks-habits" activeClassName="active">
          <AssignmentIcon />
          {isOpen ? "Tasks & Habits" : ""}
        </NavItemWrapper>
        <NavItemWrapper to="finances" activeClassName="active">
          <MonetizationOnIcon />
          {isOpen ? "Finances" : ""}
        </NavItemWrapper>
        <NavItemWrapper to="view-activity-units" activeClassName="active">
          <TocIcon />
          {isOpen ? "View Activity Units" : ""}
        </NavItemWrapper>
        <NavItemWrapper to="charts" activeClassName="active">
          <BarChartIcon />
          {isOpen ? "Charts" : ""}
        </NavItemWrapper>
        <NavItemWrapper to="settings" activeClassName="active">
          <SettingsIcon />
          {isOpen ? "Settings" : ""}
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
