import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { myHistory } from "./ListHome";
import "./RentHome.css"
import RemoveIcon from '@mui/icons-material/Remove';
export const RentHome = () => {
  function createData(name, distance, price, review, status) {
    return { name, distance, price, review, status };
  }

  const rows = [
    createData("Jabeur Electric Scooter", 159, 6.0, 24, 4.0),
    createData("Ahmed Electric Scooter", 237, 9.0, 37, 4.3),
    createData("Mourad Electric Scooter", 262, 16.0, 24, 6.0),
    createData("Henry Electric Scooter", 305, 3.7, 67, 4.3),
    createData("Mikay Electric Scooter", 356, 16.0, 49, 3.9),
  ];
  return (
    <Grid container style={{ display: "flex" }}>
      <Grid item lg={10} pl={4}>
        <Box display="flex" justifyContent="space-between">
          <span className="near-Rent-Page">Devices near me</span>
          <span className="see-All-Near-Rent-Page">see all</span>
        </Box>
        <Box mt={2}>
          <Table
            tableRow={["Device", "distance", "price", "preview", "status"]}
            rows={rows}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={8}>
          <span className="near-Rent-Page">History</span>
          <span className="see-All-Near-Rent-Page">see all</span>
        </Box>
        <Box mt={2}>
          {myHistory?.map((history) => (
              <div>
            <Box
              display="flex"
              justifyContent="space-between"
              py={2}
            >
              <Box className="container-col-History-Rent-Home">
                <span className="date-Rent-Page-History">{history?.day}</span>
                <span className="name-Rent-Page-History">{history?.name}</span>
                <span className="status-Rent-Page-History">{history?.status}</span>
              </Box>
              <Box>
                <Typography>{history?.price}</Typography>
              </Box>
            </Box>
                <svg width="100%" height="6" viewBox="0 0 757 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.2" d="M0.333333 3.125C0.333333 4.59776 1.52724 5.79167 3 5.79167C4.47276 5.79167 5.66667 4.59776 5.66667 3.125C5.66667 1.65224 4.47276 0.458333 3 0.458333C1.52724 0.458333 0.333333 1.65224 0.333333 3.125ZM751.333 3.12493C751.333 4.59769 752.527 5.7916 754 5.7916C755.473 5.7916 756.667 4.59769 756.667 3.12493C756.667 1.65217 755.473 0.458267 754 0.458268C752.527 0.458268 751.333 1.65218 751.333 3.12493ZM3 3.625L754 3.62493L754 2.62493L3 2.625L3 3.625Z" fill="black" fill-opacity="0.9"/>
                </svg>

              </div>

          ))}{" "}
        </Box>
      </Grid>
      <Grid item lg={4}></Grid>
    </Grid>
  );
};
