const themeColors = "#abc4ff"; // rgb: 171, 196, 255

export const theme = {
  colors: {
    primary: "#000000",
    secondary: "#FFFFFF",
    alternative: "#d3d3d3",
    theme: themeColors,
    danger: "#ff758f",
    success: "#ccff33",
    themeSecondary: "#ff6d00",
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
    largeCardShadow: "rgba(0, 0, 0, 0.6) 0px 20px 20px 5px",
    smallCardShadow:
      "rgba(0, 0, 0, 0.09) 0px 1px 2px, rgba(0, 0, 0, 0.09) 0px 2px 4px, rgba(0, 0, 0, 0.09) 0px 4px 8px, rgba(0, 0, 0, 0.09) 0px 8px 16px, rgba(0, 0, 0, 0.09) 0px 16px 32px",
    innerShadow: "rgba(0, 0, 0, 0.5) 0px -30px 30px -20px inset",
    innerSmallShadow: "rgba(171, 196, 255, 0.4) 0px -20px 20px -15px inset",
  },
};
