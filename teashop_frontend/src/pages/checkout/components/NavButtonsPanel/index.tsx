import { Button, Grid } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import React from "react";
import useStyles from "./styles";

interface Props {
    onContinueButtonClick: () => void;
    onBackButtonClick: () => void;
    continueButtonLabel?: string;
    backButtonLabel?: string;
}

const NavButtonsPanel = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid item className={classes.button}>
                <Button onClick={props.onBackButtonClick}>
                    <ArrowBackIosIcon className={classes.backButtonIcon} />
                    {props.backButtonLabel ? props.backButtonLabel : "Back"}
                </Button>
            </Grid>
            <Grid item className={classes.button}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={props.onContinueButtonClick}
                >
                    {props.continueButtonLabel
                        ? props.continueButtonLabel
                        : "Continue"}
                    <ArrowForwardIosIcon
                        className={classes.forwardButtonIcon}
                    />
                </Button>
            </Grid>
        </Grid>
    );
};

export default NavButtonsPanel;
