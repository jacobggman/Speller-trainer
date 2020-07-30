import React from "react";
import { EmailPass } from "components/EmailPassl";
import { Username } from "components/Username";
import { Typography } from '@material-ui/core';

const Login = () => {
    return (
        <div>
            <Typography>Login</Typography>
            <EmailPass></EmailPass>
        </div>
    );
};

export default Login;