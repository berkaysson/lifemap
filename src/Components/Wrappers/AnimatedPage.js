import { motion } from "framer-motion";
import { animations } from "../../Style/animations";

export const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={animations.pageAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
