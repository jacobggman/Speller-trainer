import React, { useState } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
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


    if (localStorage.getItem('x-auth-token') === null) {
        history.push("/login");
    }
    // rand
    const tellWord = () => {
        var msg = new SpeechSynthesisUtterance(word);
        window.speechSynthesis.speak(msg);
    }

    const getWord = () => {
        axios.get("api/words/rand", {
            headers: {
                'auth-token': localStorage.getItem('x-auth-token')
            }
        }
        ).then((res) => {
            return res.data;
            setWord(res.data);
            tellWord();

        }).catch((err) => {
            alert(err.response.data);
        })
    }

    const [value, setValue] = React.useState()
    const [word, setWord] = useState((getWord()));

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
                    value={value}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            if (value === word) {
                                alert("yay!")
                            }
                            else {
                                alert(word)
                                alert("OUF!")
                            }
                            getWord();
                        }
                    }}
                />
                {/*<AppButton fullWidth >Submit</AppButton>*/}
                <Button variant="contained" color="secondary" onClick={() => tellWord()}>Play sound</Button>

                <Typography
                    item
                    variant="p"
                >Type the word you hear and press enter</Typography>


            </Grid>
        </div>
    );
};
