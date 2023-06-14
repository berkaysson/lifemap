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

  @keyframes fade-in-out {
    0% {
      opacity: 0;
    }
    33% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  & > .nav-item-text {
    display: none;
    opacity: 0;
    animation: fade-in-out 0.5s ease-in-out forwards;

    &.active {
      display: inline-block;
      opacity: 1;
    }
  }
`;
