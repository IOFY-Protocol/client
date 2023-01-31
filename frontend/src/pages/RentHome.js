import React, { useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Table from "../components/Table";
import { myHistory } from "./ListHome";
import { ethers, BigNumber } from "ethers";
import { iofyContractAddress, iofyContractAbi } from "../App";

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

  const getIoTDevice = async (id) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const contract = new ethers.Contract(
          iofyContractAddress,
          iofyContractAbi.abi,
          provider
        );

        let iotDevice = await contract.getIoTDevice(id);
        const stylesMining = ["color: black", "background: yellow"].join(";");
        console.log(
          "%c iot device =  %s",
          stylesMining,
          iotDevice
        );
        //setFee(fee);
        return iotDevice;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getIoTDevice(7549);
  }, []);
  return (
    <Grid container style={{ display: "flex" }}>
      <Grid item lg={10} pl={4}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Devices near me</Typography>
          <Typography>see all</Typography>
        </Box>
        <Box mt={2}>
          <Table
            tableRow={["Device", "distance", "price", "preview", "status"]}
            rows={rows}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={8}>
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
              borderBottom="1px solid rgba(0, 0, 0, 0.9)"
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
      </Grid>
      <Grid item lg={4}></Grid>
    </Grid>
  );
};
