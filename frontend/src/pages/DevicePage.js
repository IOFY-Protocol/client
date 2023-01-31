import {Box, Button, Typography} from "@mui/material";
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {ReactComponent as ArrowIcon} from "../assets/Arrow.svg";
import Input from "../components/ui";
import './DevicePage.css';

export const DevicePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {name, price, rentalTime, status, description} =
    location?.state?.device || {};
    const [editable, setEditable] = React.useState(false);
    return (
        <Box>
            <Box onClick={() => navigate("/list")} p={4}>
                <ArrowIcon style={{ cursor: "pointer" }} />
            </Box>
            <Box display="flex" justifyContent="center">
                <span className="title-Device-Page">{name}</span>
            </Box>
            <Box mt={2}>
                <Box display="flex" justifyContent="center">
                    <img className="image-Device-Page"
                         src={
                             "https://www.mickeynews.com/wp-content/uploads/2016/08/Goofystar_1600-1280x640.jpg"
                         }
                         width={1000}
                         height={400}
                         style={{borderRadius: "10px"}}
                    />
                </Box>
                <Box
                    display="flex"
                    mt={4}
                    flexDirection="column"
                    gap="20px"
                >
                    <div className="container-line-Device-Page">
                        <label className="text-Device-Page" style={{ marginRight: "20px" }}>ammount gernerated </label>
                        <span className="text-value-Device-Page">300$</span>
                    </div>
                    <div className="container-line-Device-Page">
                        <label className="text-Device-Page" style={{ marginRight: "20px" }}>Rental Times </label>
                        <span className="text-value-Device-Page">{rentalTime}</span>
                    </div>
                    <div className="container-line-Device-Page">
                        <label className="text-Device-Page" style={{ marginRight: "20px" }}>Name </label>
                        {editable ? (
                            <input className="input-value-Device-Page" defaultValue={name} />
                        ) : (
                            <span className="text-value-Device-Page">{name}</span>
                        )}
                    </div>
                    <div className="container-line-Device-Page">
                        <label className="text-Device-Page" style={{ marginRight: "20px" }}>Fee </label>
                        {editable ? (
                            <input type="text" className="input-value-Device-Page" defaultValue={price} />
                        ) : (
                            <span className="text-value-Device-Page">{price}</span>
                        )}
                    </div>
                    <div className="container-line-Device-Page">
                        <label className="text-Device-Page" style={{ marginRight: "20px" }}>Status </label>
                        {editable ? (
                            <Input
                                type="select"
                                width={500}
                                defaultValue={status}
                                options={["in Use", "Available"]}
                            />
                        ) : (
                            <span className="text-value-Device-Page">{status}</span>
                        )}
                    </div>
                    <div className="container-line-Device-Page">
                        <label className="text-Device-Page" style={{ marginRight: "20px" }}>Description </label>
                        {editable ? (
                            <textarea
                                className="input-value-Device-Page"
                                defaultValue={description}
                                rows={4}
                            />
                        ) : (
                            <span className="text-value-Device-Page">{description}</span>
                        )}
                    </div>
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
