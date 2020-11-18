import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    errorMessage: string;
}

const ErrorInfo = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid item className={classes.root}>
                <Typography variant="h3">Sorry</Typography>
                <Typography variant="h6">{props.errorMessage}</Typography>
            </Grid>
        </Grid>
    );
};

export default ErrorInfo;
