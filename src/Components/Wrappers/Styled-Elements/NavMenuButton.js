import styled from "styled-components";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavMenuButtonWrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.theme};
  border-radius: 50%;
  padding: ${({ theme }) => theme.sizes.small};
  transition: all 0.2s;
  margin: -${({ theme }) => theme.sizes.small} ${({ theme }) => theme.sizes.medium};
  position: absolute;
  right: 0;
  z-index: 99;
  &:hover {
    color: ${({ theme }) => theme.colors.themeSecondary};
  }

  @media (max-width: 375px){
    margin: -10px 10px;
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
