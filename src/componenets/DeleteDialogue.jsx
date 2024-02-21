import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

export default function ConfirmationDialog({ open, onClose, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="d-flex align-items-center justify-content-center mt-10">
        <WarningAmberRoundedIcon
          sx={{ fontSize: 50, color: "red", marginTop: 1 }}
        />
      </div>
      <DialogTitle sx={{ fontWeight: 400, fontSize: 20 }}>
        Do you really want to delete?
      </DialogTitle>
      <DialogActions>
        <button
          className="btn btn-sm btn-success"
          onClick={handleConfirm}
          color="primary"
        >
          Confirm
        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={onClose}
          color="error"
        >
          Cancel
        </button>
      </DialogActions>
    </Dialog>
  );
}
