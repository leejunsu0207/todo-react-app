import {Button, Grid, InputBase, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import React, {useEffect, useState} from "react";
import {call} from "./service/ApiService";
import {useLocation} from "react-router-dom";
import moment from "moment";
import 'moment/locale/ko';


const ViewUpdateSr = (props) => {

    const onCancel = props.onCancel;
    const updateSr = props.updateSr;

    const accessUsername = localStorage.getItem("USERNAME");

    const [flag, setFlag] = useState(true);

    const [items, setItems] = useState([
        {
            caller: "",
            consDay: "",
            consDetail: "",
            mgr: "",
            orgCd: "",
            orgNm: "",
            proc: "",
            procDay: "",
            procDetail: "",
            receiver: "",
            srId: "",
        },
    ]);

    useEffect(() => {

        call("/sr/view/"+srId, "GET", null)
            .then((response) => {
                setItems(response.data[0]);
            });

    }, []);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let srId = params.get("srId");


    const consDetailHandleChange = (e) => {
        setItems({
            ...items,
            consDetail : e.target.value
        });
    };


    const procDetailHandleChange = (e) => {
        setItems({
            ...items,
            procDetail : e.target.value
        });
        if(items.procDay === ""){
            setItems({
                ...items,
                procDay : moment().format("YYYY-MM-DD HH:mm:ss"),
                mgr : accessUsername,
            });
        }
    };


    const editSr = () =>{
        // call("/sr", "PUT", items)
        //     .then((response) => setItems(response.data));
        updateSr(items);
    }

    let procD;
    let procM;

    if(items.procDay !== ""){
        procM = (
            <TextField
                id={items.mgr}
                name={items.mgr}
                value={items.mgr}
                sx={{m: 1, width: '25ch'}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">처리자 : </InputAdornment>,
                }}
            />
        )

        procD = (
            <TextField
                id={items.procDay}
                name={items.procDay}
                value={items.procDay}
                sx={{m: 1, width: '25ch'}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">처리일 : </InputAdornment>,
                }}
            />
        )


    }


    return (
        <Grid container spacing={4} style={{marginTop: 20}}>
            <Grid container spacing={2}>
                <Grid item sx={12}>
                    <Typography component="h1" variant="h5">SR UPDATE</Typography>
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
                    id="consDetail"
                    name="consDetail"
                    value={items.consDetail}
                    sx={{m: 1, width: '50ch'}}
                    multiline
                    rows={10}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">상담내역 : </InputAdornment>,
                    }}
                    onChange={consDetailHandleChange}
                />
                <TextField
                    id="procDetail"
                    name="procDetail"
                    value={items.procDetail}
                    sx={{m: 1, width: '50ch'}}
                    multiline
                    rows={10}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">처리내역 : </InputAdornment>,
                    }}
                    onChange={procDetailHandleChange}
                />
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    id="receiver"
                    name="receiver"
                    value={items.receiver}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">수신자 : </InputAdornment>,
                    }}
                />
                {procM}


            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    id="consDay"
                    name="consDay"
                    value={items.consDay}
                    sx={{m: 1, width: '25ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">상담일 : </InputAdornment>,
                    }}
                />
                {procD}

            </Grid>

            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <Button fullWidth variant="contained" color="primary"
                    onClick={editSr}>
                    add
                </Button>
                <Button fullWidth color="secondary" cariant="outlined"
                        onClick={onCancel}>
                    go back
                </Button>
            </Grid>

        </Grid>
    );

}

export default ViewUpdateSr;

