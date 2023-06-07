import NavBar from "./NavBar";
import {theme} from "../Style/theme"

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  color: ${({theme}) => theme.colors.primary};
  background-color: ${({theme}) => theme.colors.secondary};
  font-size: ${({theme}) => theme.sizes.medium};
  padding: ${({theme}) => theme.sizes.medium};
`;

const Sidebar = styled.aside`
`;

const MainContent = styled.main`
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
