import Snackbar from "@mui/material/Snackbar";

const SnackbarModal = ({snackbarState, snackbarCloseHandler}) => {
  const handleClose = (event, reason) => {
    snackbarCloseHandler(event, reason);
  };

  return (
    <>
      <Snackbar
        autoHideDuration={3000}
        open={snackbarState.open}
        onClose={handleClose}
        message={snackbarState.message}
        anchorOrigin={{
          vertical:"top",
          horizontal:"center"
        }}
      />
    </>
  );
};

export default SnackbarModal;
