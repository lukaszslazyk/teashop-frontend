import { Button, Grid } from "@material-ui/core";
import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const NavButtonsPanel = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={6}>
                <Button component={Link} to="/cart">
                    <ArrowBackIosIcon className={classes.backButtonIcon} />
                    Back to cart
                </Button>
            </Grid>
            <Grid item xs={6} container justify="flex-end">
                <Button variant="contained" color="primary">
                    Continue
                    <ArrowForwardIosIcon
                        className={classes.forwardButtonIcon}
                    />
                </Button>
            </Grid>
        </Grid>
    );
};

export default NavButtonsPanel;
