import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Area({ label, rows, ...props }) {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          backgroundColor: "white",
          borderRadius: "10px",
        },
      }}
      noValidate
      autoComplete="off"
      display="flex"
      alignItems="center"
      gap="20px"
    >
      <label>{label}</label>

      <TextField
        id="outlined-basic"
        variant="outlined"
        {...props}
        multiline={true}
        rows={rows}
        style={{ ...props }}
      />
    </Box>
  );
}
