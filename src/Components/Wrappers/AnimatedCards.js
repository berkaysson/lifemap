import { motion } from "framer-motion";
import { animations } from "../../Style/animations";

export const AnimatedCards = ({ children }) => {
  return (
    <motion.div
      variants={animations.cardAnimation}
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
