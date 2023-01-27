import * as React from "react";
import UploadIcon from "../../assets/FileIcon.png";

export default function File({ label, ...props }) {
  return (
    <div style={{ backgroundColor: "white" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-betweeen",
          width: "100%",
        }}
      >
        <label style={{ marginRight: "30px" }}>{label}</label>
        <label for="inputTag">
          <img
            src={UploadIcon}
            width={40}
            height={40}
            style={{ marginBottom: "20px" }}
          />{" "}
          <input
            id="inputTag"
            type="file"
            style={{ display: "none", ...props }}
            {...props}
          />
          <br />
          <span id="imageName"></span>
        </label>
      </div>
    </div>
  );
}
