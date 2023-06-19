import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GridOnIcon from "@mui/icons-material/GridOn";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

import NavToggleButton from "../Components/Wrappers/Styled-Elements/NavToggleButton";
import { NavWrapper } from "../Components/Wrappers/Styled-Wrappers/Navigation/NavWrapper";
import { NavItemWrapper } from "../Components/Wrappers/Styled-Wrappers/Navigation/NavItemWrapper";
import NavMenuButton from "../Components/Wrappers/Styled-Elements/NavMenuButton";

const NavItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
`;

const NavBar = ({
  isMobileNavActive,
  onMobileNavChange,
  isMobileNavOpen,
}) => {
  const navRef = useRef(null);

  const [isOpen, setIsOpen] = useState(() => {
    if (window.innerWidth <= 1024) return false;
    else return true;
  });

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  const NavBarContent = (
    <NavWrapper
      isOpen={isOpen}
      id="nav"
      ref={navRef}
      isMobileNavActive={isMobileNavActive}
    >
      <NavItemsWrapper>
        <NavItemWrapper to="/lifemap/" activeClassName="active">
          <HomeIcon />
          <span className={`nav-item-text ${isOpen ? "active" : ""}`}>
            Home
          </span>
        </NavItemWrapper>
        <NavItemWrapper
          to="/lifemap/edit-activity-unit"
          activeClassName="active"
        >
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
        <NavItemWrapper
          to="/lifemap/view-activity-units"
          activeClassName="active"
        >
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
      {isMobileNavActive ? (
        ""
      ) : (
        <NavToggleButton
          onClick={toggleIsOpen}
          isOpen={isOpen}
          id={"NavToggleButton"}
        />
      )}
    </NavWrapper>
  );

  const toggleIsMobileNavOpen = () => {
    onMobileNavChange();
    setIsOpen(true);
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      if (window.innerWidth > 768) {
        if (
          window.innerWidth <= 1024 &&
          navRef.current &&
          !navRef.current.contains(event.target)
        ) {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("click", handleWindowClick);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  return (
    <>
      {isMobileNavActive ? (
        <>
          <NavMenuButton
            onClick={toggleIsMobileNavOpen}
            isMobileNavOpen={isMobileNavOpen}
          />
          {isMobileNavOpen ? NavBarContent : ""}
        </>
      ) : (
        <div ref={navRef} style={{ height: "100%" }}>
          {NavBarContent}
        </div>
      )}
    </>
  );
};

export default NavBar;
