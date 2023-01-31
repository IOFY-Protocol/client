import React, { useEffect } from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import { ReactComponent as ArrowIcon } from "../assets/Arrow.svg";
import { useNavigate } from "react-router-dom";
import Input from "../components/ui";
import { ethers, BigNumber } from "ethers";
import { iofyContractAddress, iofyContractAbi } from "../App";
import axios from 'axios';


const ListDeviceForm = () => {
  const [fee, setFee] = React.useState("");
  const [metadata, setMetadata] = React.useState({
    category: "",
    deviceName: "",
    rentalFee: "",
    description: "",
    imgCid: ""
  })
  const createIotDevice = async () => {
    const getId = await axios.get("http://localhost:8000/ID")
    const id = (getId?.data).toString()
    console.log("get id", id)
    const objMeta = { ...metadata, id }
    console.log("meta =", objMeta)
    const response = await axios.post('http://localhost:8000/createDataBase', objMeta);
    console.log("post response =", response)
    //const cid = "zdpuAnvUDYnohUe6SenG5dLaQp99h7yuFdT9nHVwguxUVtJWJ/7889"
    const {root, path} = response.data.result ||{}
    const cid = root + "/" + path
    console.log("cid", cid)
    await addIotDevice(cid,Number(id),Number(objMeta.rentalFee))

  }


  //console.log("meta =", metadata)
  const getFee = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const contract = new ethers.Contract(
          iofyContractAddress,
          iofyContractAbi.abi,
          provider
        );

        let fee = await contract.getFee();
        const stylesMining = ["color: black", "background: yellow"].join(";");
        /*console.log(
          "%c Deployed Campaign Contracts addresses =  %s",
          stylesMining,
          campaignList
        );*/
        setFee(fee);
        return fee;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getFee();
  }, []);

  /**
  * Create a new Iot device
  */
  const addIotDevice = async (
    cid,
    id,
    rentCost
  ) => {
    if (!rentCost && Number(rentCost)) {
      console.log(`Error, Please enter a valid rentCost`);
      return;
    }

    try {
      const { ethereum } = window;
      if (ethereum) {
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
        contract.on("CreateIotDevice", (receiver, iotDeviceId, costPerHour, cid) => {
          console.log("newIot owner address :", receiver.toString());
          console.log("newIot Id :", iotDeviceId.toNumber());
          console.log("newIot fee :", costPerHour.toNumber());
          console.log("newIot cid :", cid);
        });
        let tx = await contract.createIoTDevice(
          cid,
          BigNumber.from(id),
          BigNumber.from(rentCost)
        );
        const stylesMining = ["color: black", "background: yellow"].join(";");
        console.log(
          "%c Create new iot device... please wait!  %s",
          stylesMining,
          tx.hash
        );
        //wait until a block containing our transaction has been mined and confirmed.
        const receipt = await tx.wait();
        const stylesReceipt = ["color: black", "background: #e9429b"].join(";");
        console.log(
          "%c🍵 We just added new iot device %s ",
          stylesReceipt,
          tx.hash
        );
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
            `%c🧬 new iot device added, see transaction %s`,
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

  const navigate = useNavigate();
  return (
    <Box>
      <Box onClick={() => navigate("/list")} p={4}>
        <ArrowIcon style={{ cursor: "pointer" }} />
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography>List your Device for Rent</Typography>
      </Box>
      <Box
        mt={2}
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap="20px"
      >
        <Input type="text" label="Adress" width={500} />
        <Input type="text" label="Category" width={500} onChange={(e) => setMetadata({ ...metadata, category: e.target.value })} />
        <Input type="text" label="Device Name" width={500} onChange={(e) => setMetadata({ ...metadata, deviceName: e.target.value })} />
        <Input type="text" label="Rental fee (per Hour)" width={500} onChange={(e) => setMetadata({ ...metadata, rentalFee: e.target.value })} />
        <Input type="area" label="Describe your device" width={500} rows={4} onChange={(e) => setMetadata({ ...metadata, description: e.target.value })} />
        <Input type="file" label="Image of device" />

        <Button
          style={{
            backgroundColor: "#2A1053",
            border: "1px solid #FFFFFF",
            color: "white",
            borderRadius: "10px",
            padding: "10px 30px",
          }}
          onClick={() => createIotDevice()}
        >
          List your device
        </Button>
      </Box>
    </Box>
  );
};

export default ListDeviceForm;
