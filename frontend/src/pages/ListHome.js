import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BigNumber, ethers } from "ethers";
import { iofyContractAbi, iofyContractAddress } from "../App";



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
const ListHome = () => {
  const [isLoading, setIsloading] = useState(false);
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

   /**
   *  withdraw owner funds
   */
   const withdraw = async (recipient, amount) => {

    if (!amount && Number(amount)) {
      console.log(`Error, Please enter a valid amount`);
      return;
    }

    try {
      const { ethereum } = window;
      if (ethereum) {
        setIsloading(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          iofyContractAddress,
          iofyContractAbi.abi,
          signer
        );

        /**
         *  Receive Emitted Event from Smart Contract
         *  @dev See newAttributeAdded emitted from our smart contract add_new_attribute function
         */
        contract.on(
          "Withdraw",
          async (
            ownerAdr,
            recipient,
            amountEvent
          ) => {
            console.log("Iot owner address :", ownerAdr.toString());
            console.log("recipient address :", recipient.toString());
            console.log("amount :", amountEvent.toString());
          }
        );
        let usdtAmount = ethers.utils.parseEther(amount.toString());
        let tx = await contract.withdraw(recipient, usdtAmount);
        const stylesMining = ["color: black", "background: yellow"].join(";");
        console.log(
          "%c withdraw device... please wait!  %s",
          stylesMining,
          tx.hash
        );
        //wait until a block containing our transaction has been mined and confirmed.
        const receipt = await tx.wait();
        const stylesReceipt = ["color: black", "background: #e9429b"].join(";");
        console.log(
          "%c successful withdraw %s ",
          stylesReceipt,
          tx.hash
        );
        setIsloading(false);

        /* Check our Transaction results */
        if (receipt.status === 1) {
          /**
           * @dev NOTE: Switch up these links once we go to Production
           * Currently set to use Polygon Mumbai Testnet
           */
          const stylesPolygon = ["color: white", "background: #7e44df"].join(
            ";"
          );
          console.log(
            `%c successful withdraw, see transaction %s`,
            stylesPolygon,
            tx.hash
          );
        }
        return;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

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

export default ListHome;
