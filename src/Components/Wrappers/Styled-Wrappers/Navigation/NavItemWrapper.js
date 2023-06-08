import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavItemWrapper = styled(NavLink)`
display: flex;
flex-direction: row;
align-items: center;
font-size: ${({ theme }) => theme.sizes.medium};
padding: ${({ theme }) => theme.sizes.small};
text-decoration: none;
cursor: pointer;
color: ${({ theme }) => theme.colors.secondary};
border-radius: ${({ theme }) => theme.radius.medium};

&:hover {
  color: ${({ theme }) => theme.colors.theme};
}

&.active {
  background-color: ${({ theme }) => theme.colors.alternative};
  color: ${({ theme }) => theme.colors.theme};
}
`;
