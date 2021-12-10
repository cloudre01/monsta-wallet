import { Box, CircularProgress, Modal, Typography } from "@mui/material";

const CustomModal = ({
  open,
  title,
  content,
}: {
  open: boolean;

  title: string;
  content: string;
}) => {
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }} py={5}>
          <CircularProgress />
        </Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
