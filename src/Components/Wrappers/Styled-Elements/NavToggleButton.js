import styled from "styled-components";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.theme};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.medium};
  padding: ${({ theme }) => theme.sizes.small};
  pointer-events: none;
  transition: all 0.4s;
  border: 1px solid ${({ theme }) => theme.colors.themeSecondary};
  transform: ${({ isOpen }) =>
    !isOpen ? "rotate(180deg)" : "rotate(0)"};
  width: ${({isOpen}) => isOpen ? "50%" : "70%"};

  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadows.innerShadow};
  }
`;

const NavToggleButton = ({ onClick, isOpen, id }) => {
  const menuIcon = <MenuOpenIcon fontSize="small" />;
  return (
    <Button id={id} isOpen={isOpen} onClick={onClick}>
      {menuIcon}
    </Button>
  );
};

export default NavToggleButton;
