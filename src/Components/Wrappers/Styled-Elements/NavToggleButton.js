import styled from "styled-components";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

const Button = styled.button`
  position: absolute;
  top: 30px;
  right: -2.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  border-radius: 50%;
  padding: ${({ theme }) => theme.sizes.small};
  opacity: 0;
  pointer-events: none;
  transition: all 0.4s;
  border: 1px solid black;

  transform: ${({ isOpen }) =>
    !isOpen ? "rotate(180deg) translateX(-50%)" : "rotate(0) translateX(-50%)"};

  &:hover {
    color: ${({ theme }) => theme.colors.themeSecondary};
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
