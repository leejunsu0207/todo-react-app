import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";

const AddTodo = (props) => {

    // 사용자 입력을 저장할 오브젝트
    const {item, setItem} = useState({title : ""});

    // onInputChange function write
    const onInputChange = (e) =>{
        setItem({title: e.target.value});
        console.log(item);
    };

    // onInputChage function textField 연결
    return (
      <Grid container style={{marginTop : 20}}>
          <Grid sx={11} md={11} item style={{paddingRight : 16}}>
              <TextField placeholder="Add Todo hear" fullWidth
                onChange={onInputChange} value={item.title}
              />
          </Grid>
          <Grid sx={1} md={1} item>
              <Button fullWidth style={{ height : '100%'}} color="secondary" cariant="outlined"> + </Button>
          </Grid>
      </Grid>
    );

}

export default AddTodo;