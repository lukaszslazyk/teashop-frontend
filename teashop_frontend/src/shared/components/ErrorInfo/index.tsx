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
        <Grid container spacing={1} className={classes.root}>
            <Grid item xs={12}>
                <Typography
                    variant="h3"
                    align="center"
                    className={classes.titleText}
                >
                    {props.title ? props.title : "Sorry :("}
                </Typography>
            </Grid>
            {props.errorMessage.split("\n").map((line, idx) => (
                <Grid item xs={12}>
                    <Typography key={idx} variant="h6" align="center">
                        {line}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default ErrorInfo;
