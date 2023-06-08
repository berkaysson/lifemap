import styled from "styled-components";

export const NavWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? "240px" : "60px")};
  border-radius: ${({ theme }) => theme.radius.medium};

  transition: width 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    width: 2.4rem;
    height: 100%;
    top: 0;
    left: 100%;
  }

  //Toggle button visibility
  &:hover #NavToggleButton {
    opacity: 1;
    pointer-events: auto;
    transform: ${({ isOpen }) =>
      !isOpen ? "rotate(180deg) translateX(0)" : "rotate(0) translateX(0)"};
  }
`;