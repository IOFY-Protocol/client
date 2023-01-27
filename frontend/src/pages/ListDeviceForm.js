import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { ReactComponent as ArrowIcon } from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui";

const ListDeviceForm = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box onClick={() => navigate("/list")} p={4}>
        <ArrowIcon style={{ cursor: "pointer" }} />
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>List your Device for Rent</Typography>
      </Box>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap="20px"
      >
        <Input type="text" label="Adress" width={500} />
        <Input type="text" label="Category" width={500} />
        <Input type="text" label="Device Name" width={500} />
        <Input type="text" label="Rental fee (per Hour)" width={500} />
        <Input type="area" label="Describe your device" width={500} rows={4} />
        <Input type="file" label="Image of device" />

        <Button
          style={{
            backgroundColor: "#2A1053",
            border: "1px solid #FFFFFF",
            color: "white",
            borderRadius: "10px",
            padding: "10px 30px",
          }}
        >
          List your device
        </Button>
      </Box>
    </Box>
  );
};

export default ListDeviceForm;
