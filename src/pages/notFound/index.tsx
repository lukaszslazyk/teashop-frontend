import { Grid, Typography } from "@material-ui/core";
import React from "react";
import MainLayout from "../../layout/main";
import useStyles from "./styles";

const NotFoundPage = () => {
    const classes = useStyles();

    return (
        <MainLayout>
            <Grid container justify="center">
                <Grid item className={classes.notFoundInfo}>
                    <Typography variant="h3">
                        Sorry
                    </Typography>
                    <Typography variant="h6">
                        The page does not exist.
                    </Typography>
                </Grid>
            </Grid>
        </MainLayout>
    );
};

export default NotFoundPage;
