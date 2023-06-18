import styled from "styled-components";
import { motion } from "framer-motion";

import { animations } from "../../../../Style/animations";

const NavWrapperWrapper = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  padding: 10px;
  height: 100%;
  width: ${({ isOpen }) => (isOpen ? "240px" : "63px")};
  border: 1px solid ${({ theme }) => theme.colors.theme};
  border-radius: ${({ theme }) => theme.radius.large};
  box-shadow: ${({ theme }) => theme.boxShadows.largeCardShadow};

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

  @media (max-width: 768px) {
    margin-left: 10px;
    width: 95%;
  }
`;

export const NavWrapper = ({ isOpen, children }) => {
  return (
    <NavWrapperWrapper
      variants={animations.cardAnimation}
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      isOpen={isOpen}
    >
      {children}
    </NavWrapperWrapper>
  );
};
