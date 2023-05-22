import {signin, signup} from "./service/ApiService";
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

function SignUp() {
    const handleSubmit = (event) =>{
        event.preventDefault();
        // object에서 from에 저장된 데이터를 map으로 변경
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        // ApiService의 signin 메서드를 사용해 로그인
        signup
        (
            {
                username:username,
                password:password
            }
        ).then((response) => {
            // 계정 생성 성공시 login 페이지로 redirect
            window.location.href="/login";
        });

    };

    return(
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>

            <Grid container spacing={2}>
                <Grid item sx={12}>
                    <Typography component="h1" variant="h5">회원가입</Typography>
                </Grid>
            </Grid>


            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨 */}
                <Grid container spacing={2}>
                    <Grid item sx={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="아이디"
                            name="username"
                            autoComplete="fname"
                        />
                    </Grid>
                    <Grid item sx={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item sx={12}>
                        <Button type="submit" fullWidth variant="contained" color="primary">계정생성</Button>
                    </Grid>
                    <Grid item>
                        <Link to="/login" variant="body2">
                            계정이 있으면 로그인
                        </Link>
                    </Grid>
                </Grid>


            </form>

        </Container>
    );

}


export default SignUp;