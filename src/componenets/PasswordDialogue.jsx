import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useUpdatePasswordMutation } from "../api/api";
import { toast } from "sonner";
import Loader from "./Loader";

export default function ConfirmationDialog({ open, onClose, onConfirm }) {
  const user = useSelector((state) => state.authReducer.activeUser);
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleConfirm = () => {
    updatePassword({
      currPassword: oldPassword,
      newPassword,
      _id: user._id,
    }).then((res) => {
      if (res?.error) {
        toast.error(res.error.data.error, {
          style: { textTransform: "capitalize" },
        });
      } else if (res?.data?.message) {
        setOldPassword("");
        setNewPassword("");
        onClose();
        toast.success("Password Updated!");
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": { width: "400px" } }}
    >
      <DialogTitle sx={{ fontWeight: 400, fontSize: 20 }}>
        Change Password
      </DialogTitle>
      <DialogContent>
        <div className="form-group">
          <label>Old Password</label>
          <input
            type="text"
            className="form-control"
            style={{ width: "100%" }}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>New Password </label>
          <input
            type="text"
            className="form-control"
            style={{ width: "100%" }}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        {isLoading ? (
          <Loader size={25} />
        ) : (
          <button
            className="btn btn-sm btn-success"
            onClick={handleConfirm}
            color="primary"
          >
            Confirm
          </button>
        )}
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
