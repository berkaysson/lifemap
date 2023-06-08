import styled from "styled-components";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Button = styled.button`
  

  &:hover {
  }
`;

const NavToggleButton = ({ onClick, isOpen }) => {
  const menuIcon = isOpen ? <MenuOpenIcon /> : <MenuOutlinedIcon />
  return(<Button onClick={onClick}>{menuIcon}</Button>);
};

export default NavToggleButton;
