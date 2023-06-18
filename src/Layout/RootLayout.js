import NavBar from "./NavBar";
import { theme } from "../Style/theme";

import { Outlet } from "react-router-dom";
import styled, { css } from "styled-components";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";
import { fadeIn } from "../Style/animations";

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.theme};
  font-size: ${({ theme }) => theme.sizes.medium};
  width: 100%;
  max-width: 1300px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  padding: ${({ theme }) => theme.sizes.medium};
  z-index: 2;

  @media (max-width: 1024px) {
    position: fixed;
    height: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;

    ${({ isMobileNavOpen }) =>
      isMobileNavOpen &&
      css`
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(2px);
          z-index: -1;
          animation: ${fadeIn} 0.1s ease-in-out forwards;
        }
      `}
  }
`;

const MainContent = styled.main`
  flex: 1;
  margin: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-x: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.theme};
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.boxShadows.largeCardShadow};

  @media (max-width: 1024px) {
    grid-column: 1 / 3;
    margin-left: 7rem;
  }

  @media (max-width: 768px) {
    margin: ${({ theme }) => theme.sizes.small};
    padding: ${({ theme }) => theme.sizes.medium};
  }
`;

const NavBarWrapper = styled(NavBar)`
  width: 100%;

  @media (max-width: 1024px) {
    position: sticky;
    top: 0;
  }
`;

const RootLayout = () => {
  const [isMobileNavActive, setIsMobileNavActive] = useState(() => {
    if (window.innerWidth <= 768) return true;
    else return false;
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleIsMobileNavOpen = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  useEffect(() => {
    const handleWindowResize = (event) => {
      if (window.innerWidth <= 768) {
        setIsMobileNavActive(true);
      } else {
        setIsMobileNavActive(false);
      }
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Sidebar isMobileNavOpen={isMobileNavOpen}>
          <NavBarWrapper
            isMobileNavActive={isMobileNavActive}
            onMobileNavChange={toggleIsMobileNavOpen}
            isMobileNavOpen={isMobileNavOpen}
          />
        </Sidebar>

        <MainContent>
          <Outlet />
        </MainContent>
      </RootContainer>
    </ThemeProvider>
  );
};

export default RootLayout;
