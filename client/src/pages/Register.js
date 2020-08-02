import React from "react";
import { EmailPass } from "components/EmailPassl";
import { Username } from "components/Username";
import { Typography, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AppButton } from "components/AppButton";


import { makeStyles } from "@material-ui/styles";


const useStyle = makeStyles(() => ({
    mainGrid: {
        minHeight: '100vh'
    },
}))

export const Register = () => {
    const link = (<Link to="/login">here</Link>);
    const classes = useStyle();

    return (
        <Grid
            className={classes.mainGrid}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">
            <Typography>Register</Typography>
            <Username></Username>
            <EmailPass></EmailPass>

            <AppButton>Register</AppButton>
            <div>
                <Typography>Have an account? Click {link} to login.</Typography>
            </div>
        </Grid>
    );
};
