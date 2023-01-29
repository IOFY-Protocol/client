import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Layout = ({ children }) => {
  return (
    <Box mx={8}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height="50px"
      >
        <Typography>IOFY</Typography>
        <Box display="flex" alignItems="center">
          <Link to={"/rent"}>
            <Typography style={{ marginRight: "20px" }}>
              Rent a device
            </Typography>
          </Link>
          <Link to={"/list"}>
            <Typography>list a device</Typography>
          </Link>
        </Box>
        <ConnectButton label="Sign in" />
      </Box>
      <Box mt={5}>{children}</Box>
    </Box>
  );
};

export default Layout;