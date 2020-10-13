import React, { useState, Text } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { TopBar } from "components/TopBar";
import InputBase from '@material-ui/core/InputBase';
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/styles";
import axios from 'axios';

const useStyle = () => {
    return makeStyles(() => ({
        root: {
            flexGrow: 1,
        },


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

// get username

class Game extends React.Component {
    constructor() {
        super();
        this.state = { word: "", inputText: "", showWord: "", rightChars: undefined, lastDefinition: { word: "", definition: "" } };
        this.classes = useStyle();
        this.options = {
            headers: { 'auth-token': localStorage.getItem('x-auth-token') }
        };

    }

    async componentDidMount() {
        this.getWord().then(() => {
            this.tellWord();
        })

        this.setState({ username: (await axios.get("api/user/username", this.options)).data })

    }

    async getWord() {
        const newWord = await axios.get("api/words/rand", this.options);

        this.setState({
            word: newWord.data
        })
    }

    showRightWord(rightWord, answered) {
        var chars = [];
        var haveRed = false;

        if (answered === undefined || rightWord === undefined) return;
        for (let index = 0; index < rightWord.length; index++) {
            const realChar = rightWord[index];
            const answeredChar = answered[index];
            const isRedColor = answeredChar == null || answeredChar != realChar;
            if (isRedColor) {
                haveRed = true;
            }
            chars.push(<text style={{ fontSize: "100px", color: isRedColor ? 'red' : "green" }}>{realChar}</text>)

        }

        if (!haveRed && answered.length != rightWord.length) {
            chars.push(<text style={{ fontSize: "100px", color: 'red' }}>...</text>)
        }

        this.setState(
            {
                rightChars: (<body>{chars}</body>)
            }
        )
    }

    tellWord() {
        speechSynthesis.speak(new SpeechSynthesisUtterance(this.state.word));
    }

    tellDefinition() {
        const lastD = this.state.lastDefinition;
        if (lastD.word === this.state.word) {
            speechSynthesis.speak(new SpeechSynthesisUtterance(lastD.definition));
            return
        }
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${this.state.word}`;
        axios.get(url).then(res => {
            try {
                const definition = (res.data[0].meanings[0].definitions[0].definition);
                this.setState({ lastDefinition: { word: this.state.word, definition: definition } });
                speechSynthesis.speak(new SpeechSynthesisUtterance(definition));
            } catch (error) {
                alert("Can't find definition");
            }

        })

    }

    onAnswer() {
        this.showRightWord(this.state.word, this.state.inputText);
        axios.post("/api/words/answer", {
            isRight: this.state.inputText === this.state.word
        }, this.options).catch((e) => {
            alert(e)
        })

        this.setState({ inputText: "" });
        this.getWord().then(() => {
            this.tellWord();
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TopBar name={this.state.username} />
                <Grid
                    container
                    direction="column"
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

                    <Button variant="contained" color="secondary" onClick={() => this.tellWord()}>Tell word</Button>
                    <Button variant="contained" color="secondary" onClick={() => this.tellDefinition()}>Tell definition</Button>

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