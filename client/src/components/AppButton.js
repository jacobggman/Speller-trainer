import React from "react";
import { Button } from '@material-ui/core';


export const AppButton = ({
    text,
    ...props
}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            {...props}>
        </Button>
    );
};
