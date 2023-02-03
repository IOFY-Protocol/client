import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function DenseTable({tableRow, rows}) {
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        {tableRow?.map((row) => (
                            <TableCell>{row}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody style={{width: "100%"}}>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{"&:last-child td, &:last-child th": {border: 0}}}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                onClick={() =>
                                    navigate(`/rent/${row?.iotDeviceId}`, {state: {row}})
                                }
                                style={{cursor: "pointer"}}
                            >
                                {row?.iotDeviceId}
                            </TableCell>
                            <TableCell align="left">{row?.distance}</TableCell>
                            <TableCell align="left">{row?.costPerHour}</TableCell>
                            <TableCell align="left">{row?.review}</TableCell>
                            <TableCell align="left">{row?.isActive}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
