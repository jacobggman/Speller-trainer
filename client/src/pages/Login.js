import React from "react";
import { Typography, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import { EmailPass } from "components/EmailPassl";
import { AppButton } from "components/AppButton";

import { makeStyles } from "@material-ui/styles";


const useStyle = makeStyles(() => ({
    mainGrid: {
        minHeight: '100vh'
    },
}))

export const Login = () => {
    const classes = useStyle();
    const link = (<Link to="/register">here</Link>);

    return (
        <Grid
            className={classes.mainGrid}
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center">

            <Typography variant="h3" >SPELLER TRAINER</Typography>
            <Typography variant="h3" >login</Typography>
            <EmailPass onSubmit={() => console.log("test")}></EmailPass>

            <AppButton>Login</AppButton>
            <div>
                <Typography >Don't have an account? Click {link} to register.</Typography>
            </div>
        </Grid>
    );
};
