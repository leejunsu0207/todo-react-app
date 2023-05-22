import React, {useEffect, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import {call} from "./service/ApiService";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {Button, Grid, List, Paper} from "@mui/material";
import Todo from "./Todo";
import ViewDetailSr from "./ViewDetailSr";
import ViewUpdateSr from "./ViewUpdateSr";


const ViewSr = (props) => {

    const [flag, setFlag] = useState(true);
    const [items, setItems] = useState('');
    const onCancel = () =>{
        window.history.back();
    }

    const flagChange = (item) => {
        setFlag(false);
    }

    const updateSr = (item) => {
        call("/sr", "PUT", item)
            .then((response) => window.location.href="/ViewSr?srId="+item.srId);
    }


    let content;


    let viewDetailSr = (
        <div>
            <ViewDetailSr flagChange={flagChange}
                    onCancel={onCancel}/>
        </div>
    )

    let viewUpdateSr = (
        <div>
            <ViewUpdateSr onCancel={onCancel}
            updateSr={updateSr}/>

        </div>
    )

    content = viewDetailSr;

    if(!flag){
        content = viewUpdateSr;
    }





    return (
        <div className="ViewSr">
            {content}
        </div>
    );


}

export default ViewSr;