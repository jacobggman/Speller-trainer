import React from "react";
import { TextField, Typography } from "@material-ui/core";
import { AppButton } from "components/AppButton";
import { TopBar } from "components/TopBar";



export const Game = () => {
    return (
        <div>
            <TopBar />
            <Typography variant="h2">Type the word you hear and press enter</Typography>
            <TextField></TextField>
            <AppButton >Submit</AppButton>
            <AppButton >Logout</AppButton>

        </div>
    );
};
