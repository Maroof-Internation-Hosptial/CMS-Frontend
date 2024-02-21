import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const CustomModal = ({
  open,
  setOpen,
  children,
  width = 400,
  textAlign = "center",
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: width,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: 2,
    textAlign: textAlign,
  };
  return (
    <Modal
      open={open}
      onClose={() => setOpen((prev) => !prev)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
