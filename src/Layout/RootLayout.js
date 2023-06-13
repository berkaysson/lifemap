import NavBar from "./NavBar";
import { theme } from "../Style/theme";

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.alternative};
  font-size: ${({ theme }) => theme.sizes.medium};
  width: 100%;
  max-width: 1300px;
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  padding: ${({ theme }) => theme.sizes.medium};
  z-index: 2;
`;

const MainContent = styled.main`
  flex: 1;
  margin: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.large};
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow-x: hidden;
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.boxShadows.largeCardShadow};
`;

const NavBarWrapper = styled(NavBar)`
  width: 100%;
`;

const RootLayout = () => {
  return (
    <ThemeProvider theme={theme}>
      <RootContainer>
        <Sidebar>
          <NavBarWrapper />
        </Sidebar>

        <MainContent>
          <Outlet />
        </MainContent>
      </RootContainer>
    </ThemeProvider>
  );
};

export default RootLayout;
