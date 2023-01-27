import React from "react";
import AreaInput from "./Area";
import File from "./File";
import FormInput from "./Inputs";
import BasicSelect from "./Select";

const Inputs = ({ type, ...props }) => {
  switch (type) {
    case "text":
      return <FormInput {...props} />;
    case "area":
      return <AreaInput {...props} />;
    case "file":
      return <File {...props} />;
    case "select":
      return <BasicSelect {...props} />;
    default:
      return <FormInput {...props} />;
  }
};

export default Inputs;
