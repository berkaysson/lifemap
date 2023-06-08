import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const NavItemWrapper = styled(NavLink)`
display: flex;
flex-direction: row;
align-items: center;
position: relative;
gap: 0.8rem;
font-size: ${({ theme }) => theme.sizes.medium};
padding: ${({ theme }) => theme.sizes.small};
text-decoration: none;
cursor: pointer;
color: ${({ theme }) => theme.colors.secondary};
border-radius: ${({ theme }) => theme.radius.medium};
transition: 0.4s;
height: 45px;
box-shadow: ${({ theme }) => theme.boxShadows.innerShadow};

text-overflow:clip;
white-space: nowrap;

&:hover {
  color: ${({ theme }) => theme.colors.theme};
}

&.active {
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
}

@keyframes fade-in-out {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

&>.nav-item-text{
  display: none;
  opacity: 0;
  animation: fade-in-out 0.4s ease-in-out forwards;

  &.active{
    display: inline-block;
    opacity: 1;
  }
}
`;
