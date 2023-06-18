import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavMenuButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 50%;
  padding: ${({ theme }) => theme.sizes.small};
  transition: all 0.4s;
  border: 1px solid black;
  margin: 3px 1rem;

  &:hover {
    color: ${({ theme }) => theme.colors.themeSecondary};
  }
`;

const NavMenuButton = ({ onClick, isMobileNavOpen }) => {
  const menuIcon = isMobileNavOpen ? (
    <CloseIcon fontSize="medium" />
  ) : (
    <MenuIcon fontSize="medium" />
  );
  return (
    <NavMenuButtonWrapper onClick={onClick}>{menuIcon}</NavMenuButtonWrapper>
  );
};

export default NavMenuButton;
