import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

const AddTodo = (props) => {

    // 사용자 입력을 저장할 오브젝트
    const [item, setItem] = useState({title: ""});
    const addItem = props.addItem;

    // enterKeyEventhandler function
    const enterKeyEventhandler = (e) => {
        if( e.key === 'Enter'){
            onButtonClick();
        }
    }

    // onButtonClick function write
    const onButtonClick = () => {
        addItem(item); // addItem함수 사용
        setItem({title: ""});
    }

    // onInputChange function write
    const onInputChange = (e) => {
        setItem({title: e.target.value});
        console.log(item);
    };

    // onInputChage function textField 연결
    return (
        <Grid container style={{marginTop: 20}}>
            <Grid sx={11} md={11} item style={{paddingRight: 16}}>
                <TextField placeholder="Add Todo here" fullWidth
                           onChange={onInputChange}
                           onKeyPress={enterKeyEventhandler}
                           value={item.title}/>
            </Grid>
            <Grid sx={1} md={1} item>
                <Button fullWidth style={{height: '100%'}} color="secondary" cariant="outlined"
                        onClick={onButtonClick}>
                    +
                </Button>
            </Grid>
        </Grid>
    );

}

export default AddTodo;