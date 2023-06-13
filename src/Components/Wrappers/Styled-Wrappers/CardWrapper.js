import styled from "styled-components";
import { motion } from "framer-motion";

const CardWrapperWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.alternative};
  border-radius: ${({ theme }) => theme.radius.medium};
  box-shadow: ${({ theme, disableBoxShadow = false }) =>
    disableBoxShadow ? "none" : theme.boxShadows.smallCardShadow};
`;

export const CardWrapper = ({ children }) => {
  return (
    <motion.div
      animate={{ opacity: [0,1], transform:["scale(0.9)","scale(1)"]}}
      transition={{duration:0.3,ease: "easeOut"}}
    >
      <CardWrapperWrapper>{children}</CardWrapperWrapper>
    </motion.div>
  );
};