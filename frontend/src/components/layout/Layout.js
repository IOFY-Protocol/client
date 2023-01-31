import {Box} from "@mui/material";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import React from "react";
import {NavLink} from "react-router-dom";
import "./layout.css";

const Layout = ({children}) => {
    return (
        <Box mx={8}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                height="50px"
            >
                <p className="project-title">IOFY</p>
                <Box display="flex" alignItems="center">
                    <NavLink className="link-layout" to={"/rent"}>
            <span style={{marginRight: "20px"}}>
              Rent a device
            </span>
                    </NavLink>
                    <NavLink className="link-layout" to={"/list"}>
                        <span>list a device</span>
                    </NavLink>
                </Box>
                <div className="wrapper-connect-btn-Layout">
                    <ConnectButton label="+"/>
                </div>
            </Box>
            <Box mt={5}>{children}</Box>
    </Box>
  );
};

export default Layout;
