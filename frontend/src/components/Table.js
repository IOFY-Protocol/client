import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export default function DenseTable({ tableRow, rows }) {
  const navigate = useNavigate();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableRow?.map((row) => (
              <TableCell>{row}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody style={{ width: "100%" }}>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() =>
                  navigate(`/rent/${row?.name}`, { state: { row } })
                }
                style={{ cursor: "pointer" }}
              >
                {row.name}
              </TableCell>
              <TableCell align="left">{row.distance}</TableCell>
              <TableCell align="left">{row.price}</TableCell>
              <TableCell align="left">{row.review}</TableCell>
              <TableCell align="left">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
