import {Box, Button, CircularProgress} from "@mui/material";
import axios from "axios";
import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {iofyContractAbi, iofyContractAddress, mockTokenContractAbi, mockTokenContractAdress,} from "../App";
import {ReactComponent as ArrowIcon} from "../assets/Arrow.svg";
import Mic from "../assets/Mic.png";
import BasicModal from "../components/Modal/Modal";
import "./RentPage.css";

const RentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState();
    const [userAddress, setUserAddress] = useState();
    const [islocked, setIslocked] = useState(undefined);
    const [isLoading, setIsloading] = useState(false);
    const [rentalTime, setRentalTime] = useState("");

    const {name, distance, price, review, isActive, cid, owner} =
    location?.state?.row || {};
    //zdpuB1RsEudVE45aHUNy84qsrEPGkCroFFrTmM1GThA8s9jFN/7549
    const getData = async () => {
        const metaData = await axios.get("http://localhost:8000/orbitdb/" + cid);
        const data = metaData?.data && metaData?.data[0];
        setData(data);
    };
    console.log("data", data);
    useEffect(() => {
        getData();
        //console.log("post response =", response);
    }, []);
    console.log("locked", islocked);
    /**
     * rent an Iot device
     */
    const rentIoTDevice = async (iotDeviceId, user, amount, startsIn) => {
        if (!iotDeviceId && Number(iotDeviceId)) {
            console.log(`Error, Please enter a valid iotDeviceId`);
            return;
        }

        if (!amount && Number(amount)) {
            console.log(`Error, Please enter a valid amount`);
            return;
        }

        if (!startsIn && Number(startsIn)) {
            console.log(`Error, Please enter a valid startsIn`);
            return;
        }

        try {
            const {ethereum} = window;
            if (ethereum) {
                setIsloading(true);
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    iofyContractAddress,
                    iofyContractAbi.abi,
                    signer
                );
                const stableToken = new ethers.Contract(
                    mockTokenContractAdress,
                    mockTokenContractAbi.abi,
                    signer
                );

                /**
                 *  Receive Emitted Event from Smart Contract
                 *  @dev See newAttributeAdded emitted from our smart contract add_new_attribute function
                 */
                contract.on(
                    "RentIot",
                    async (
                        receiver,
                        user,
                        iotDeviceId,
                        id,
                        costPerHour,
                        fee,
                        start,
                        end
                    ) => {
                        console.log("Iot receiver address :", receiver.toString());
                        console.log("Iot owner address :", user.toString());
                        console.log("Iot iotDeviceId :", iotDeviceId.toNumber());
                        console.log("Iot costPerHour :"/*, utils.bigNumberify(costPerHour.toNumber())*/);
                        /*console.log("Iot start :", start.toNumber());
                        console.log("Iot end :", end.toNumber());
                        console.log("Iot fee :", fee.toNumber());*/
                        const did = iotDeviceId.toString();
                        const response = await axios.post(
                            "http://localhost:8000/unlockDevice",
                            {did, timeout: (Number(rentalTime) * 1000).toString()}
                        );
                        console.log("post response =", response);
                        setIslocked(response?.data?.result);
                    }
                );
                let usdtAmount = ethers.utils.parseEther(amount.toString());
                let appr = await stableToken.approve(iofyContractAddress, usdtAmount);
                console.log("approve... please wait!");
                await appr.wait();
                let tx = await contract.rentIoT(iotDeviceId, user, usdtAmount, startsIn);
                const stylesMining = ["color: black", "background: yellow"].join(";");
                console.log(
                    "%c rent iot device... please wait!  %s",
                    stylesMining,
                    tx.hash
                );
                //wait until a block containing our transaction has been mined and confirmed.
                //NewCampaignCreated event has been emitted .
                const receipt = await tx.wait();
                const stylesReceipt = ["color: black", "background: #e9429b"].join(";");
                console.log(
                    "%c We just added new iot device %s ",
                    stylesReceipt,
                    tx.hash
                );
                setIsloading(false);
                setOpen(false);

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
                        `%c new iot device added, see transaction %s`,
                        stylesPolygon,
                        tx.hash
                    );
                }

            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        const onNewSigner = async () => {
            let addr;
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();

                addr = await signer.getAddress();

                setUserAddress(addr.toString());
            }
        };

        onNewSigner();
    }, [window.ethereum]);

    return (
        <Box>
            <Box onClick={() => navigate("/rent")} p={4}>
                <ArrowIcon style={{cursor: "pointer"}}/>
            </Box>
            <Box display="flex" justifyContent="center">
                <span className="title-Device-Page">{name}</span>
            </Box>
            <Box mt={2}>
                <Box display="flex" justifyContent="center">
                    <img
                        className="image-Rent-Page"
                        src={Mic}
                        width={1000}
                        height={400}
                        style={{borderRadius: "10px"}}
                    />
                </Box>
                <Box display="flex" mt={4} flexDirection="column" gap="20px">
                    <div className="container-line-Rent-Page">
                        <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                            Name{" "}
                        </label>

                        <span className="text-value-Device-Page">
              {data?.DeviceName || name || ""}
            </span>
                    </div>
                    <div className="container-line-Rent-Page">
                        <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                            Owner{" "}
                        </label>
                        <span className="text-value-Device-Page">{owner}</span>
                    </div>
                    <div className="container-line-Rent-Page">
                        <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                            Status{" "}
                        </label>

                        <span className="text-value-Device-Page">
              {isActive ? "Available" : "Not Available"}
            </span>
                    </div>
                    <div className="container-line-Rent-Page">
                        <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                            Rating{" "}
                        </label>

                        <span className="text-value-Device-Page">{review}</span>
                    </div>
                    <div className="container-line-Rent-Page">
                        <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                            Rental Fee{" "}
                        </label>

                        <span className="text-value-Device-Page">
              {data?.RentalFee || price}
            </span>
                    </div>

                    <div className="container-line-Rent-Page">
                        <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                            Description{" "}
                        </label>

                        <span className="text-value-Device-Page">{data?.Description}</span>
                    </div>
                    {islocked && (
                        <div className="container-line-Rent-Page">
                            <label className="text-Rent-Page" style={{marginRight: "20px"}}>
                                unlocked{" "}
                            </label>

                            <span className="text-value-Device-Page">{islocked}</span>
                        </div>
                    )}
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
                    onClick={() => setOpen(true)}
                >
                    Rent
                </Button>
            </Box>
            <BasicModal open={open} handleClose={() => setOpen(false)}>
                <Box p={8}>
                    <Box>
                        <label className="text-label-Page" style={{marginBottom: "10px"}}>
                            specify your time (per Hour)
                        </label>
                        <input
                            placeholder="specify your time "
                            className="input-rent-Devices"
                            type="text"
                            onChange={(e) => setRentalTime(e.target.value)}
                        />
                        <label className="text-label-Page" style={{marginTop: "10px"}}>
                            coast estimation :{Number(data?.RentalFee) * Number(rentalTime)} $ USDT
                        </label>
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
                                width: "200px",
                            }}
                            onClick={() =>
                                rentIoTDevice(
                                    Number(data._id),
                                    userAddress,
                                    Number(data?.RentalFee) * Number(rentalTime),
                                    0
                                )
                            }
                        >
                            {isLoading ? <CircularProgress/> : "Confirm"}
                        </Button>
                    </Box>
                </Box>
            </BasicModal>
        </Box>
    );
};

export default RentPage;
