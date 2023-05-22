import React, {useEffect, useState} from "react";

import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from "@mui/material/TableHead";
import SearchOrgNm from "./SearchOrgNm";
import {call} from "./service/ApiService";
import {Link} from "react-router-dom";
import {DataGrid} from "@mui/x-data-grid";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ListSr = (props) => {

    const [item, setItem] = useState(props.item);
    const [items, setItems] = useState([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        call("/org", "GET", null)
            .then((response) => {
                setItems(response.data);
                setLoading(false);
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, {});


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - item.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const searchItem = (item) =>{

        if(item.orgInfo === null){
            item.orgInfo = {
                "orgCd":"",
                "orgNm":""
            }
        }

        const orgCd = item.orgInfo.orgCd;
        let url;
        if(item.orgInfo === "" || item.orgInfo === null){
            url = "/sr"
        }else{
            url = "/sr/"+orgCd;
        }
        call(url, "GET", null)
            .then((response) => setItem(response.data));
        // item.id = "ID-" + items.length; // key를 위한 id
        // item.done = false; // done 초기화
        // // update는 반드시 setItes로하고 새 배열을 만들어야 한다.
        // setItems([...items, item]);
    }

    const columns = [
        { id: 'orgNm', label: '기관명', minWidth: 100, align: 'center'},
        { id: 'proc', label: '진행상태', minWidth: 50, align: 'center'},
        { id: 'caller', label: '발신자', align: 'center'},
        { id: 'receiver', label: '수신자', align: 'center'},
        { id: 'mgr', label: '처리자', align: 'center'},
        { id: 'consDay', label: '상담일시', minWidth: 100, align: 'center'},
        { id: 'procDay', label: '처리일시', minWidth: 100, align: 'center'},
    ];
    
    function viewSr(srId) {
        window.location.href="/ViewSr?srId="+srId;
    }

    return(
        <div>
            <SearchOrgNm searchItem={searchItem}
                         item={items}/>
            <TableContainer component={Paper} style={{margin : 16}}>
                <Table sx={{ minWidth: 800 }} stickyHeader aria-label="srList table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) =>
                                <TableCell key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? item.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : item
                        ).map((item) => (
                            <TableRow key={item.srId} onClick={() => viewSr(item.srId)}>
                                <TableCell align="center">
                                    {item.orgNm}
                                </TableCell>
                                <TableCell align="center">
                                    {item.proc}
                                </TableCell>
                                <TableCell align="center">
                                    {item.caller}
                                </TableCell>
                                <TableCell align="center">
                                    {item.receiver}
                                </TableCell>
                                <TableCell align="center">
                                    {item.mgr}
                                </TableCell>
                                <TableCell align="center">
                                    {item.consDay}
                                </TableCell>
                                <TableCell align="center">
                                    {item.procDay}
                                </TableCell>
                            </TableRow>

                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={7}
                                count={item.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );


};

export default ListSr;