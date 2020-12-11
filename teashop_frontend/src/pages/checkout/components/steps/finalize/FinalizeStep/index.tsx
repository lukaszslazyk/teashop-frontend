import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../../../configuration/routing";
import useLogic from "./logic";
import useStyles from "./styles";

const FinalizeStep = () => {
    const logic = useLogic();
    const classes = useStyles();
    const {
        orderFormIsSending,
        errorOccurred,
        placedOrderNo,
        orderDetailsRoutePath,
    } = logic;

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.statusIconContainer}>
                    {orderFormIsSending && (
                        <CircularProgress
                            size={100}
                            className={classes.progress}
                        />
                    )}
                    {!orderFormIsSending && errorOccurred && (
                        <CancelIcon className={classes.failIcon} />
                    )}
                    {!orderFormIsSending && !errorOccurred && (
                        <CheckCircleIcon className={classes.successIcon} />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        {orderFormIsSending && "Please wait"}
                        {!orderFormIsSending && errorOccurred && "Sorry"}
                        {!orderFormIsSending &&
                            !errorOccurred &&
                            "Your order has been placed successfully"}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {orderFormIsSending && (
                        <Typography variant="h6" align="center">
                            We are processing your order
                        </Typography>
                    )}
                    {!orderFormIsSending && errorOccurred && (
                        <Typography variant="h6" align="center">
                            We've encountered some problems while processing
                            your request.
                            <br />
                            Please reload page and try again.
                        </Typography>
                    )}
                    {!orderFormIsSending && !errorOccurred && (
                        <Grid item xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center">
                                        Your order number is: {placedOrderNo}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" align="center">
                                        You can see order details{" "}
                                        <Link
                                            to={orderDetailsRoutePath}
                                            className={classes.link}
                                        >
                                            here
                                        </Link>
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={Link}
                                        to={routing.home}
                                        className={classes.backToMainPageButton}
                                    >
                                        Back to main page
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FinalizeStep;
