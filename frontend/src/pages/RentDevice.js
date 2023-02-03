import React from "react";
import Tabs from "../components/Tabs";
import {RentHome} from "./RentHome";

const RentDevice = () => {
    return (
        <>
            <Tabs tabName={["Home"]} tabsContent={[<RentHome/>, "w"]}/>
        </>
    );
};

export default RentDevice;
