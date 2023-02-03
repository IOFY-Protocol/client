import {Box} from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function Inputs({
                                   borderRadius = "10px",
                                   backgroundColor = "white",
                                   label,
                                   ...props
                               }) {
    return (
        <Box
            component="form"
            sx={{
                "& > :not(style)": {backgroundColor, borderRadius},
            }}
            noValidate
            autoComplete="off"
            display="flex"
            alignItems="center"
            gap="20px"
        >
            {label && <label>{label}</label>}
            <TextField
                id="outlined-basic"
                variant="outlined"
                {...props}
                style={{...props}}
            />
        </Box>
    );
}
