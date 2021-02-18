import {
    Button,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../configuration/routing";
import useStyles from "./styles";

interface Props {
    title?: string;
    errorMessage: string;
}

const ErrorInfo = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item xs={12}>
                <Typography
                    variant={isXsScreen ? "h4" : "h3"}
                    align="center"
                    className={classes.titleText}
                >
                    {props.title ? props.title : "Sorry :("}
                </Typography>
            </Grid>
            {props.errorMessage.split("\n").map((line, idx) => (
                <Grid item xs={12} key={idx}>
                    <Typography
                        variant={isXsScreen ? "body1" : "h6"}
                        align="center"
                    >
                        {line}
                    </Typography>
                </Grid>
            ))}
            <Grid item xs={12} container justify="center">
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={routing.home}
                        className={classes.backToHomeButton}
                    >
                        Back to main page
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ErrorInfo;
