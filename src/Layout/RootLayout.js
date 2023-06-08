import NavBar from "./NavBar";
import {theme} from "../Style/theme"

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  color: ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.secondary};
  font-size: ${({theme}) => theme.sizes.medium};
`;

const Sidebar = styled.aside`
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  padding: ${({theme}) => theme.sizes.medium};
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({theme}) => theme.sizes.medium};
  background-color: ${({theme}) => theme.colors.secondary};
  overflow-x: hidden;
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
