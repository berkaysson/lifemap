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
  overflow-y: scroll;
  overflow-x: hidden;
  transition: width 0.3s ease;

  &::-webkit-scrollbar {
    width: 0;
  }

  & #NavToggleButton {
    position: absolute;
    bottom: 3rem;
  }

  &:hover #NavToggleButton {
    pointer-events: auto;
  }

  @media (max-width: 768px) {
    margin-left: 10px;
    width: 95%;
  }

  @media (max-height: 560px){
    #NavToggleButton {
    position: relative;
    width: 100%;
    bottom: auto;
    }
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
