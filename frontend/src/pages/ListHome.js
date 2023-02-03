import {Box, Button, Grid, Typography} from "@mui/material";
import {BigNumber, ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {iofyContractAbi, iofyContractAddress} from "../App";


export let myHistory = [
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
    const [iotDevice, setIotDevice] = useState({data: {}, iotDevices: []});
    console.log('iotDevice', iotDevice);
    useEffect(() => {
        getIotDevices();
    }, []);
    const getIotDevices = async () => {
        const data = await getIoTOwnerInfo();
        const contract = await getContract();
        let iotDevices = [];
        for (const device of data?.ioTDeviceIds) {
            const iotDevice = await contract.getIoTDevice(BigNumber.from(device).toNumber());
            console.log(iotDevice);
            iotDevices.push({
                id: BigNumber.from(iotDevice?.iotDeviceId).toString(),
                price: BigNumber.from(iotDevice?.costPerHour).toString(),
                rentalTime: BigNumber.from(iotDevice?.txCount).toString(),
                totalRaised: BigNumber.from(iotDevice?.totalRaised).toString(),
                status: iotDevice?.isActive ? "Available" : "Under Maintenance",
            });
        }
        setIotDevice({data, iotDevices});

    };
    const getContract = async () => {
        const {ethereum} = window;
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const ownerAddr = await signer.getAddress();
        return new ethers.Contract(
            iofyContractAddress,
            iofyContractAbi.abi,
            provider
        );
    };
    const getIoTOwnerInfo = async () => {
        try {
            const {ethereum} = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum, "any");
                const signer = provider.getSigner();
                const ownerAddr = await signer.getAddress();
                const contract = new ethers.Contract(
                    iofyContractAddress,
                    iofyContractAbi.abi,
                    provider
                );
                const data = await contract.getIoTOwnerInfo("0xbba228321C6f6665E7A768277f4E1CeA2F581BA6");
                //TODO replace with ownerAddr
                return data;
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <Grid container style={{display: "flex"}}>
            <Grid item lg={8} pl={12}>
                <Box display="flex" justifyContent="space-between">
                    <Typography>My devices</Typography>
                    <Typography>see all</Typography>
                </Box>
                <Box mt={2}>
                    {iotDevice.iotDevices?.map((device) => (
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom="1px solid rgba(0, 0, 0, 0.9)"
                        >
                            <Typography py={1}>{device?.id}</Typography>
                            <Link to={`/list/${device?.id}`} state={{device}}>
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
