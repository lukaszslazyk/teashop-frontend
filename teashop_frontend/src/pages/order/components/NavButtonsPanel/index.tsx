import { Button, Grid } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./styles";

interface Props {
    onContinueButtonClick: () => void;
}

const NavButtonsPanel = (props: Props) => {
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
                <Button
                    variant="contained"
                    color="primary"
                    onClick={props.onContinueButtonClick}
                >
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
