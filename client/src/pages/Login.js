import React, { useState } from "react";
import { Button, Typography, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import { EmailPass } from "components/EmailPassl";
import { makeStyles } from "@material-ui/styles";
import { AppButton } from "components/AppButton";


const useStyle = makeStyles(() => ({
    mainGrid: {
        minHeight: '100vh'
    },
}))


export const Login = (props) => {
    const classes = useStyle();
    const loginTitle = "Login";
    const registerTitle = "Register";
    const [isLogin, setPage] = useState("Register");


    const switchPage = () => {
        setPage(!isLogin);
    }

    const link = (<AppButton size="small" onClick={() => switchPage()}>here</AppButton >);

    return (
        <Grid
            className={classes.mainGrid}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">

            <Typography variant="h3" color="secondary" >SPELLER TRAINER</Typography>
            <Typography variant="h3" >{isLogin ? loginTitle : registerTitle}</Typography>

            <EmailPass haveUsername={!isLogin} setUserName={props.setUserName}></EmailPass>

            <div>
                <Typography>Don't have an account? Click {link} to {isLogin ? registerTitle : loginTitle}.</Typography>
            </div>
        </Grid>
    );
};
