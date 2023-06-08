const themeColors = "#fca311";

export const theme = {
  colors: {
    primary: "#000000",
    secondary: "#FFFFFF",
    alternative: "#2b2d42",
    theme: themeColors,
  },
  sizes: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
  radius: {
    small: "6px",
    medium: "16px",
    large: "30px",
  },
  boxShadows: {
    themeShadow: `0 0 6px 0px ${themeColors}`,
    largeCardShadow:
      "rgba(0, 0, 0, 0.5) 0px 20px 20px 5px",
    innerShadow: "rgba(0, 0, 0, 0.4) 0px -30px 30px -20px inset",
  },
};
