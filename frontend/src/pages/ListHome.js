import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export const myHistory = [
  {
    day: "21 Jan",
    name: "jabeur electirc scooter",
    status: "in Use",
    price: "100$",
  },
  {
    day: "21 Fev",
    name: "jabeur electirc scooter",
    status: "Available",
    price: "100$",
  },
  {
    day: "10 Oct",
    name: "jabeur electirc scooter",
    status: "in Use",
    price: "100$",
  },
];
const listHome = () => {
  const myDevices = [
    {
      name: "jabeur electirc scooter",
      id: "1",
      price: "21$",
      rentalTime: 1,
      status: "Available",
      description: "description here ",
    },
    {
      name: "jabeur electirc scooter",
      id: "2",
      price: "21$",
      rentalTime: 1,
      status: "Available",
      description: "description here ",
    },
    {
      name: "jabeur electirc scooter",
      id: "3",
      price: "21$",
      rentalTime: 1,
      status: "Available",
      description: "description here ",
    },
    {
      name: "jabeur electirc scooter",
      id: "4",
      price: "21$",
      rentalTime: 1,
      status: "Available",
      description: "description here ",
    },
    {
      name: "jabeur electirc scooter",
      id: "5",
      price: "21$",
      rentalTime: 1,
      status: "Available",
      description: "description here ",
    },
  ];

  return (
    <Grid container style={{ display: "flex" }}>
      <Grid item lg={8} pl={12}>
        <Box display="flex" justifyContent="space-between">
          <Typography>My devices</Typography>
          <Typography>see all</Typography>
        </Box>
        <Box mt={2}>
          {myDevices?.map((device) => (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom="1px solid rgba(0, 0, 0, 0.9)"
            >
              <Typography py={1}>{device?.name}</Typography>
              <Link to={`/list/${device?.id}`} state={{ device }}>
                <Typography>edit</Typography>
              </Link>
            </Box>
          ))}
        </Box>
        <Box display="flex" justifyContent="flex-end" width="100%" mt={4}>
          <Link to={"/deviceForm"}>
            <Button
              style={{
                border: "2px solid #2A1053",
                borderRadius: "15px",
                color: "#2A1053",
                padding: "5px 25px",
              }}
            >
              List a device
            </Button>
          </Link>
        </Box>
        <Box mt={8}>
          <Box display="flex" justifyContent="space-between">
            <Typography>History</Typography>
            <Typography>see all</Typography>
          </Box>
          <Box mt={2}>
            {myHistory?.map((history) => (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={2}
                borderBottom="1px rgba(0, 0, 0, 0.9)"
              >
                <Box>
                  <Typography>{history?.day}</Typography>
                  <Typography>{history?.name}</Typography>
                  <Typography>{history?.status}</Typography>
                </Box>
                <Box>
                  <Typography>{history?.price}</Typography>
                </Box>
              </Box>
            ))}{" "}
          </Box>
        </Box>
      </Grid>

    </Grid>
  );
};

export default listHome;
