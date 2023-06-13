export const animations = {
  pageAnimation: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  cardAnimation: {
    animate: {
      opacity: [0, 0.2, 0.2, 0.3, 0.5, 1],
      transform: ["translateX(-15%)", "translateX(0)"],
    },
    exit: { opacity: 0 },
  },
};
