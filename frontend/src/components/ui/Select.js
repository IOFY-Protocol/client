import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ options, ...props }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl style={{ backgroundColor: "white", borderRadius: "10px" }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Valeu"
          {...props}
          style={{ ...props }}
        >
          {options?.map((option) => (
            <MenuItem value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
