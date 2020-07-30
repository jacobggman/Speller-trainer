import React from "react";
import { EmailPass } from "components/EmailPassl";
import { Username } from "components/Username";
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";
import { AppButton } from "components/AppButton";

export const Register = () => {
    const link = (<Link to="/login">here</Link>);

    return (
        <div>
            <Typography>Register</Typography>
            <Username></Username>
            <EmailPass></EmailPass>

            <AppButton>Register</AppButton>
            <div>
                <Typography>Have an account? Click {link} to login.</Typography>
            </div>
        </div>
    );
};
