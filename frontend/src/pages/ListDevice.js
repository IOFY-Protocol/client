import React from "react";
import Tabs from "../components/Tabs";
import ListHome from "./ListHome";

const ListDevice = () => {
  return (
    <>
      <Tabs tabName={["Home", "Setting"]} tabsContent={[<ListHome />, "w"]} />
    </>
  );
};

export default ListDevice;
