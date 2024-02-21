import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader({ size = 40, display = "flex" }) {
  return (
    <Box sx={{ display }}>
      <CircularProgress size={size} />
    </Box>
  );
}
