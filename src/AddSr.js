import React, {useState} from "react";
import {Grid, TextField} from "@mui/material";
import {useLocation} from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import {call} from "./service/ApiService";
import moment from "moment";
import 'moment/locale/ko';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AddSr = (props) => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    let orgNm = params.get("orgNm");
    let orgCd = params.get("orgCd");

    const accessUsername = localStorage.getItem("USERNAME");

    const onCancel = () =>{
        window.history.back();
    }

    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');

    const handleOpen = (msg) => {
        setOpen(true);
        setMessage(msg);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [formProc, setFormProc] = React.useState('');

    const [formCaller, setFormCaller] = React.useState('');

    const [formConsDetail, setFormConsDetail] = React.useState('');

    const [formProcDetail, setFormProcDetail] = React.useState('');

    const [formConsDay, setFormConsDay] = React.useState('');

    const [formProcDay, setFormProcDay] = React.useState('');

    const [formReceiver, setFormReceiver] = React.useState('');

    const [formMgr, setFormformMgr] = React.useState('');

    const procHandleChange = (e) => {
        setFormProc(e.target.value);
    };

    const callerHandleChange = (e) => {
        setFormCaller(e.target.value);
    };

    const consDetailHandleChange = (e) => {
        setFormConsDetail(e.target.value);
        setFormReceiver(accessUsername);
        setFormConsDay(moment().format("YYYY-MM-DD HH:mm:ss"));
    };

    const procDetailHandleChange = (e) => {
        setFormProcDetail(e.target.value);
        setFormformMgr(accessUsername);
        setFormProcDay(moment().format("YYYY-MM-DD HH:mm:ss"));
    };


    const submitHandler = (e) => {
        e.preventDefault();

        let msg;

        if (formProc === "" || formProc === null){
            msg = "please select proc";
            handleOpen(msg);
            return false;
        }

        if (formCaller === "" || formCaller === null){
            msg = "please write caller";
            handleOpen(msg);
            return false;
        }

        if (formConsDetail === "" || formConsDetail === null){
            msg = "please write consDetail";
            handleOpen(msg);
            return false;
        }



        const srDTO = {
            proc : formProc,
            caller : formCaller,
            consDetail : formConsDetail,
            procDetail : formProcDetail,
            orgCd : orgCd,
            orgNm : orgNm,
            receiver : formReceiver,
            mgr : formMgr,
            consDay : formConsDay,
            procDay : formProcDay,
            // //날짜 생성자로 날짜 생성 후, 해당 날짜 문자열 분석하여 날짜 객체로 변환한 enteredDate 전달
            // date: new Date(enteredDate),
        };

        call("/sr", "POST", srDTO)
            .then((response) => window.location.href="/sr")

        // 양방형 바인딩: 입력 후 form에 적은 값 화면에서 없애기
        setFormProc("");
        setFormCaller("");
        setFormConsDetail("");
        setFormProcDetail("");
        setFormConsDay("");
        setFormProcDay("");
        setFormReceiver("");
        setFormformMgr("");
    };

    return (
        <form onSubmit={submitHandler}>
        <Grid container spacing={4} style={{marginTop: 20}}>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <h1>상담 내역입력</h1>
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    label="기관명"
                    id="orgNm"
                    name="orgNm"
                    value={orgNm}
                    sx={{ m: 1, width: '25ch' }}
                />
                <TextField
                    label="기관코드"
                    id="orgCd"
                    name="orgCd"
                    value={orgCd}
                    sx={{ m: 1, width: '25ch' }}
                />
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-label">진행상태</InputLabel>
                    <Select
                        id="proc"
                        name="proc"
                        value={formProc}
                        label="진행상태"
                        onChange={procHandleChange}
                    >
                        <MenuItem value={"신청"}>신청</MenuItem>
                        <MenuItem value={"배포"}>배포</MenuItem>
                        <MenuItem value={"설치진행"}>설치진행</MenuItem>
                        <MenuItem value={"테스트완료"}>테스트완료</MenuItem>
                        <MenuItem value={"전환완료"}>전환완료</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="발신자"
                    id="caller"
                    name="caller"
                    sx={{ m: 1, width: '25ch' }}
                    onChange={callerHandleChange}
                />
            </Grid>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField
                    label="상담내역"
                    id="consDetail"
                    name="consDetail"
                    sx={{ m: 1, width: '50ch' }}
                    multiline
                    rows={10}
                    onChange={consDetailHandleChange}
                />
                <TextField
                    label="처리내역"
                    id="procDetail"
                    name="procDetail"
                    sx={{ m: 1, width: '50ch' }}
                    multiline
                    rows={10}
                    onChange={procDetailHandleChange}
                />
            </Grid>

            {/*<Grid sx={11} md={11} item style={{paddingRight: 16}}>*/}
            {/*    <TextField*/}
            {/*        label="수신자"*/}
            {/*        id="receiver"*/}
            {/*        name="receiver"*/}
            {/*        sx={{ m: 1, width: '25ch' }}*/}

            {/*    />*/}

            {/*    <TextField*/}
            {/*        label="처리자"*/}
            {/*        id="mgr"*/}
            {/*        name="mgr"*/}
            {/*        sx={{ m: 1, width: '25ch' }}*/}

            {/*    />*/}
            {/*</Grid>*/}

            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <Button type="submit" fullWidth variant="contained" color="primary">sr add</Button>
                <Button fullWidth style={{height: '100%'}} color="secondary" cariant="outlined"
                        onClick={onCancel}>
                    go back
                </Button>
            </Grid>
        </Grid>

            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"This is a warning alert "}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </form>


    );


}

export default AddSr;