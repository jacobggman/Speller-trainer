import React, { useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { TopBar } from "components/TopBar";
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import axios from 'axios';
import Speech from 'react-speech';

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


export const Game = (token) => {
    const classes = useStyle();
    const history = useHistory();
    const [word, setWord] = useState("");

    if (localStorage.getItem('x-auth-token') === null) {
        history.push("/login");
    }
    // rand

    const getWord = () => {
        axios.get("api/words/rand", {
            headers: {
                'auth-token': localStorage.getItem('x-auth-token')
            }
        }
        ).then((res) => {
            const word = res.data;
            var msg = new SpeechSynthesisUtterance(word);
            window.speechSynthesis.speak(msg);
            setWord(word);

        }).catch((err) => {
            alert(err.response.data);
        })
    }



    return (
        <div>

            <TopBar />
            <Grid
                className={classes.mainGrid}
                container
                direction="column"
                justify="space-around"
                alignItems="center"
            >
                <Typography
                    item
                    variant="h2"
                >VERY LONG WORD</Typography>



                <InputBase
                    item
                    className={classes.wordField}
                    autoFocus
                    autoComplete="off"
                    placeholder="Type here"
                    inputProps={{ 'aria-label': 'naked', 'textAlign': "center" }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            getWord();
                        }
                    }}
                />
                {/*<AppButton fullWidth >Submit</AppButton>*/}
                <Typography
                    item
                    variant="p"
                >Type the word you hear and press enter</Typography>
                <Speech text="search" />

            </Grid>
        </div>
    );
};
