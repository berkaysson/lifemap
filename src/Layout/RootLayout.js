import NavBar from "./NavBar";

import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <header>
        <NavBar />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
