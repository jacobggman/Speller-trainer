import React from "react";
import { Typography, Grid } from '@material-ui/core';
import { Link } from "react-router-dom";
import { EmailPass } from "components/EmailPassl";
import { AppButton } from "components/AppButton";


export const Login = () => {
    const link = (<Link to="/register">here</Link>);
    return (
        <Grid >

            <Typography variant="h2" >Login</Typography>
            <EmailPass></EmailPass>

            <AppButton>Login</AppButton>
            <div>
                <Typography >Don't have an account? Click {link} to register.</Typography>
            </div>
        </Grid>
    );
};
