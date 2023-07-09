import Snackbar from "@mui/material/Snackbar";
import { theme } from "../../../Style/theme";
import { Slide } from "@mui/material";

const SnackbarModal = ({ snackbarState, snackbarCloseHandler }) => {
  const handleClose = (event, reason) => {
    snackbarCloseHandler(event, reason);
  };

  const contentStyles = {
    bgColor:
      snackbarState.severity === "success"
        ? theme.colors.success
        : snackbarState.severity === "error"
        ? theme.colors.danger
        : theme.colors.themeSecondary,
  };

  const messageIcon = snackbarState.severity === "success"
  ? "🎯 "
  : snackbarState.severity === "error"
  ? "⚠️ "
  : "📢 ";

  return (
    <Snackbar
      autoHideDuration={4000}
      open={snackbarState.open}
      onClose={handleClose}
      message={messageIcon+snackbarState.message}
      transitionDuration={{ enter: 200, exit: 100 }}
      TransitionComponent={Slide}
      TransitionProps={{ enter: true, exit: false }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      ContentProps={{
        sx: {
          border: `1px solid ${theme.colors.alternative}`,
          boxShadow: theme.boxShadows.smallCardShadow,
          borderRadius: theme.radius.large,
          bgcolor: contentStyles.bgColor,
          color: theme.colors.primary,
          fontFamily: "inherit",
          fontWeight: "bold",
          width:"100%",
          "& .MuiSnackbarContent-message":{
            width:"inherit",
            textAlign: "center",
          }
        },
      }}
    />
  );
};

export default SnackbarModal;
