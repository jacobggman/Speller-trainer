import React, { useState, Text } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { TopBar } from "components/TopBar";
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import axios from 'axios';

const useStyle = () => {
    return makeStyles(() => ({
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
}

// get definition https://api.dictionaryapi.dev/api/v2/entries/en/i
// get username

class Game extends React.Component {
    constructor() {
        super();
        this.state = { word: "", inputText: "", showWord: "", rightChars: undefined };
        this.classes = useStyle();
    }

    async componentDidMount() {
        this.getWord().then(() => {
            this.tellWord();
        })

    }

    async getWord() {
        const newWord = await axios.get("api/words/rand", {
            headers: {
                'auth-token': localStorage.getItem('x-auth-token')
            }
        });

        this.setState({
            word: newWord.data
        })
    }

    showRightWord(rightWord, answered) {
        var chars = [];
        if (answered === undefined || rightWord === undefined) return;
        for (let index = 0; index < rightWord.length; index++) {
            const realChar = rightWord[index];
            const answeredChar = answered[index];
            const isRedColor = answeredChar == null || answeredChar != realChar;
            chars.push(<text style={{ fontSize: "100px", color: isRedColor ? 'red' : "green" }}>{realChar}</text>)
        }

        this.setState(
            {
                rightChars: (<body>{chars}</body>)
            }
        )
    }

    tellWord() {
        var msg = new SpeechSynthesisUtterance(this.state.word);
        window.speechSynthesis.speak(msg);
    }

    onAnswer() {
        this.showRightWord(this.state.word, this.state.inputText);
        if (this.state.inputText === this.state.word) {
            alert("yay!")
        }
        else {
            alert(this.state.word)
            alert("OUF!")
        }
        this.setState({ inputText: "" });
        this.getWord().then(() => {
            this.tellWord();
        });
    }

    render() {
        const { classes } = this.props;
        return (<div>

            <TopBar />
            <Grid
                className={classes.mainGrid}
                container
                direction="column"
                justify="space-around"
                alignItems="center"
            >
                {this.state.rightChars}

                <InputBase
                    item
                    className={classes.wordField}
                    autoFocus
                    autoComplete="off"
                    placeholder="Type here"
                    inputProps={{ 'aria-label': 'naked', 'textAlign': "center" }}
                    value={this.state.inputText}
                    onChange={(e) => { this.setState({ inputText: e.target.value }) }}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            this.onAnswer();
                        }
                    }}
                />
                {}
                <Button variant="contained" color="secondary" onClick={() => this.tellWord()}>Play sound</Button>

                <Typography
                    item
                    variant="p"
                >Type the word you hear and press enter</Typography>


            </Grid>
        </div >
        );
    }
}

export default withStyles(useStyle)(Game);