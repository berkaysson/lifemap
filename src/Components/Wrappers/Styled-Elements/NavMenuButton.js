import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';

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

  &:hover {
  }
`;

const NavMenuButton = ({onClick}) => {
  const menuIcon = <MenuIcon fontSize="medium" />;
  return <NavMenuButtonWrapper onClick={onClick}>
    {menuIcon}
  </NavMenuButtonWrapper>
}

export default NavMenuButton