import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";
import styled from "styled-components";

const RootContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
`;

const Sidebar = styled.aside`
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  padding: 20px;
`;

const NavBarWrapper = styled(NavBar)`
  width: 100%;
`;

const RootLayout = () => {
  return (
    <RootContainer>
      <Sidebar>
        <NavBarWrapper />
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </RootContainer>
  );
};

export default RootLayout;