import {Button, Grid, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import React, {useEffect, useState} from "react";
import {call} from "./service/ApiService";
import {useLocation} from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const ViewDetailSr = (props) => {

    const flagChange = props.flagChange;
    const onCancel = props.onCancel;

    const [flag, setFlag] = useState(true);

    const [items, setItems] = useState([

    ]);


    const goUpdate = () => {
        flagChange(false);
    };

    useEffect(() => {

        call("/sr/view/"+srId, "GET", null)
            .then((response) => {
                setItems(response.data[0]);
            });

    }, {});


    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let srId = params.get("srId");

    console.log("items : "+items.orgNm);

    return (
        <Grid container spacing={4} style={{marginTop: 20}}>
            <Grid container spacing={2}>
                <Grid item sx={11}>
                    <Typography component="h1" variant="h5">SR DETAIL</Typography>
                </Grid>
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    id={items.orgNm}
                    name={items.orgNm}
                    value={items.orgNm}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">기관명 : </InputAdornment>,
                    }}
                />

                <TextField
                    id={items.proc}
                    name={items.proc}
                    value={items.proc}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">진행단계 : </InputAdornment>,
                    }}
                />

                <TextField
                    id={items.caller}
                    name={items.caller}
                    value={items.caller}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">발신자 : </InputAdornment>,
                    }}
                />
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    id={items.consDetail}
                    name={items.consDetail}
                    value={items.consDetail}
                    sx={{m: 1, width: '50ch'}}
                    multiline
                    rows={10}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">상담내역 : </InputAdornment>,
                    }}
                />
                <TextField
                    id={items.procDetail}
                    name={items.procDetail}
                    value={items.procDetail}
                    sx={{m: 1, width: '50ch'}}
                    multiline
                    rows={10}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">처리내역 : </InputAdornment>,
                    }}
                />
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    id={items.receiver}
                    name={items.receiver}
                    value={items.receiver}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">수신자 : </InputAdornment>,
                    }}
                />

                <TextField
                    id={items.mgr}
                    name={items.mgr}
                    value={items.mgr}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">처리자 : </InputAdornment>,
                    }}
                />
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    id={items.consDay}
                    name={items.consDay}
                    value={items.consDay}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">상담일 : </InputAdornment>,
                    }}
                />

                <TextField
                    id={items.procDay}
                    name={items.procDay}
                    value={items.procDay}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">처리일 : </InputAdornment>,
                    }}
                />
            </Grid>

            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <Button fullWidth variant="contained" color="primary"
                        onClick={goUpdate}>
                    update
                </Button>
                <Button fullWidth color="secondary" cariant="outlined"
                        onClick={onCancel}>
                    go back
                </Button>
            </Grid>

        </Grid>
    );

}

export default ViewDetailSr;

