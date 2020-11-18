import { Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    title?: string;
    errorMessage: string;
}

const ErrorInfo = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Typography variant="h3" align="center">
                    {props.title ? props.title : "Sorry"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" align="center">
                    {props.errorMessage}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ErrorInfo;
