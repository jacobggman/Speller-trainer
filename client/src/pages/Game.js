import React from "react";
import { TextField, Typography } from "@material-ui/core";
import { AppButton } from "components/AppButton";



export const Game = () => {
    return (
        <div>
            <Typography variant="h2">Type the word you hear and press enter</Typography>
            <TextField></TextField>
            <AppButton >Submit</AppButton>
            <AppButton >Logout</AppButton>

        </div>
    );
};
