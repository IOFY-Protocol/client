import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { ReactComponent as ArrowIcon } from "../assets/Arrow.svg";

const RentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, distance, price, review, status } = location?.state?.row;

  return (
    <Box>
      <Box onClick={() => navigate("/rent")} p={4}>
        <ArrowIcon style={{ cursor: "pointer" }} />
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>{name}</Typography>
      </Box>
      <Box mt={2}>
        <Box display="flex" justifyContent="center">
          <img
            src={
              "https://www.mickeynews.com/wp-content/uploads/2016/08/Goofystar_1600-1280x640.jpg"
            }
            width={1000}
            height={400}
            style={{ borderRadius: "10px" }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={4}
          flexDirection="column"
          gap="20px"
        >
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Name </label>

            <Typography>{name}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Owner </label>
            <Typography>{name}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Status </label>

            <Typography>{status}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Rating </label>

            <Typography>{review}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Fee </label>

            <Typography>{price}</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Description </label>

            <Typography>description</Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={8}>
        <Button
          style={{
            border: "1px solid #2A1053",
            borderRadius: "10px",
            color: "white",
            backgroundColor: "#2A1053",
            marginLeft: "10px",
            padding: "10px 25px",
          }}
        >
          Rent
        </Button>
      </Box>
    </Box>
  );
};

export default RentPage;
