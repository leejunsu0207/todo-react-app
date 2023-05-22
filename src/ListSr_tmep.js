import React, {useState} from "react";
import {
    Button,
    Checkbox,
    Grid,
    IconButton,
    InputBase,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom";
import {signout} from "./service/ApiService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Sr = (props) => {

    const [item, setItem] = useState(props.item);


    return(


        <TableContainer component={Paper} style={{margin : 16}}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>기관명</StyledTableCell>
                        <StyledTableCell align="right">진행상태</StyledTableCell>
                        <StyledTableCell align="right">수신자</StyledTableCell>
                        <StyledTableCell align="right">발신자</StyledTableCell>
                        <StyledTableCell align="right">처리자</StyledTableCell>
                        <StyledTableCell align="right">상담일시</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {item.map((row) => (
                        <StyledTableRow key={row.srId}>
                            <StyledTableCell component="th" scope="row">{row.orgNm}</StyledTableCell>
                            <StyledTableCell align="right">{row.proc}</StyledTableCell>
                            <StyledTableCell align="right">{row.receiver}</StyledTableCell>
                            <StyledTableCell align="right">{row.caller}</StyledTableCell>
                            <StyledTableCell align="right">{row.mgr}</StyledTableCell>
                            <StyledTableCell align="right">{row.consDay}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>


    );

};

export default Sr;