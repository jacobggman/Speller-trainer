import React from 'react'
import { Grid } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
    TheGrid: {
        minHeight: '80vh'
    },
}))


const classes = useStyle();


const ToDownGrid = props => {
    return (
        <Grid
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        />
    )
}


export default ToDownGrid
