import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { fadeIn } from "../../../../Style/animations";

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
  transition: background-color 0.4s, color 0.4s;
  height: 45px;
  box-shadow: ${({ theme }) => theme.boxShadows.innerShadow};

  text-overflow: clip;
  white-space: nowrap;

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.themeSecondary};
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.theme};
    color: ${({ theme }) => theme.colors.primary};
  }

  & > .nav-item-text {
    display: none;
    opacity: 0;
    animation: ${fadeIn} 0.5s ease-in-out forwards;

    &.active {
      display: inline-block;
      opacity: 1;
    }
  }
`;
