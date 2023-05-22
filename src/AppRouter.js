import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Typography, Box} from "@mui/material";
import SignUp from "./SignUp";
import Sr from "./Sr";
import AddSr from "./AddSr";
import ViewSr from "./ViewSr";
import TestTable4 from "./TestTable4";

function Copyright(){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            urp, {new Date().getFullYear()}
            {"."}
        </Typography>
    );

}

function AppRouter(){
    return(
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="sr" element={<Sr />} />
                    <Route path="viewSr" element={<ViewSr />} />
                    <Route path="addSr" element={<AddSr />} />
                    <Route path="testTable4" element={<TestTable4 />} />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;