import React from "react";
import { TextField, Typography, Grid } from "@material-ui/core";
import { AppButton } from "components/AppButton";
import { TopBar } from "components/TopBar";
import InputBase from '@material-ui/core/InputBase';

import { makeStyles } from "@material-ui/styles";


const useStyle = makeStyles(() => ({
    wordField: {
        width: "auto",
        fontSize: 100,
        textAlign: "center",

        textAlign: "center",
        align: "center",
        '& input': {
            textAlign: "center"
        }

    },
    mainGrid: {
        minHeight: '80vh'
    },
}))


export const Game = () => {
    const classes = useStyle();

    return (
        <div>
            <TopBar />
            <Grid
                className={classes.mainGrid}
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >

                <InputBase
                    item
                    className={classes.wordField}
                    autoFocus
                    autoComplete="off"
                    placeholder="Type here"
                    inputProps={{ 'aria-label': 'naked', 'textAlign': "center" }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            alert('{do validate}')
                        }
                    }}
                />
                {/*<AppButton fullWidth >Submit</AppButton>*/}
                <Typography
                    item
                    variant="p"
                >Type the word you hear and press enter</Typography>
            </Grid>
        </div>
    );
};
