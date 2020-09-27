import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/styles";
import { useHistory } from "react-router-dom";


const useStyle = makeStyles(() => ({
    TypographyStyle: {
        flex: 1
    }
}))


export const TopBar = () => {
    const classes = useStyle();
    const history = useHistory();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className={classes.TypographyStyle} variant="h6" >
                    UserName
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => {
                    localStorage.removeItem('x-auth-token');
                    history.push("/login");
                }}>Logout</Button>
            </Toolbar>
        </AppBar>

    )
}

