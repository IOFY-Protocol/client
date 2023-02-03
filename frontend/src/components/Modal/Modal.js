import Modal from "@mui/material/Modal";
import * as React from "react";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: '50px',
    borderRadius: "10px"
};

export default function BasicModal({open, handleClose, children, props}) {
    return (
        <Modal open={open} onClose={handleClose} {...props}>
            <div style={style}>{children}</div>
        </Modal>
    );
}
