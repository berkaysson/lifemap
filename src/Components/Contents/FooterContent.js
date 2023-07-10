import styled from "styled-components";
import { motion } from "framer-motion";
import GitHubIcon from '@mui/icons-material/GitHub';

import { animations } from "../../Style/animations";

const FooterWrapper = styled(motion.footer)`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.themeSecondary};
  border-radius: ${({ theme }) => theme.radius.large};
  padding: ${({ theme }) => theme.sizes.small};
  margin-top: 2rem;
  font-size: 0.8em;
  background-color: ${({ theme }) => theme.colors.theme};
  box-shadow: ${({theme}) => theme.boxShadows.innerShadow};

  & > a {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & > .github-icon {
        transition: all 0.4s ease;
      }

    &:hover{
      & > .github-icon {
        transform: rotate(360deg);
      }
    }
  }

  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const FooterContent = () => {
  return (
    <FooterWrapper
    variants={animations.cardAnimation}
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2 }}
    >
      <p>&copy; 2023 Lifemap. All rights reserved.</p>
      <a href="https://github.com/berkaysson" target="_blank" rel="noreferrer">
        <GitHubIcon className="github-icon" fontSize="medium" /> @berkaysson
      </a>
    </FooterWrapper>
  );
};

export default FooterContent;
