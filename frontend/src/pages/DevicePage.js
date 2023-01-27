import React from "react";
import { ReactComponent as ArrowIcon } from "../assets/Arrow.svg";
import { Box, Button, Typography, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../components/ui";

export const DevicePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, price, rentalTime, status, description } =
    location?.state?.device || {};
  const [editable, setEditable] = React.useState(false);
  return (
    <Box>
      <Box onClick={() => navigate("/list")} p={4}>
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
            <label style={{ marginRight: "20px" }}>ammount gernerated </label>

            <Typography>300$</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Rental Times </label>
            <Typography>{rentalTime}</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Name </label>
            {editable ? (
              <Input type="text" width={500} defaultValue={name} />
            ) : (
              <Typography>{name}</Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Fee </label>
            {editable ? (
              <Input type="text" width={500} defaultValue={price} />
            ) : (
              <Typography>{price}</Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Status </label>
            {editable ? (
              <Input
                type="select"
                width={500}
                defaultValue={status}
                options={["in Use", "Available"]}
              />
            ) : (
              <Typography>{status}</Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center">
            <label style={{ marginRight: "20px" }}>Description </label>
            {editable ? (
              <Input
                type="area"
                width={500}
                defaultValue={description}
                rows={4}
              />
            ) : (
              <Typography>{description}</Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" mt={8}>
        <Button
          style={{
            border: "1px solid #2A1053",
            borderRadius: "10px",
            color: "#2A1053",
            padding: "10px 25px",
          }}
          onClick={() => navigate("/list")}
        >
          Cancel
        </Button>
        <Button
          style={{
            border: "1px solid #2A1053",
            borderRadius: "10px",
            color: "white",
            backgroundColor: "#2A1053",
            marginLeft: "10px",
            padding: "10px 25px",
          }}
          onClick={() => setEditable(true)}
        >
          {editable ? "Update" : "Modify"}
        </Button>
      </Box>
    </Box>
  );
};
