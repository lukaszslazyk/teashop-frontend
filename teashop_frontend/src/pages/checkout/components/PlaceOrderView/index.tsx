import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../configuration/routing";
import { placeOrder } from "../../../../domain/order/actions";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import useStyles from "./styles";

const PlaceOrderView = () => {
    const orderFormData = useSelector(
        (state: RootState) => state.order.orderFormData
    );
    const orderFormIsSending = useSelector(
        (state: RootState) => state.order.orderFormIsSending
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.order.orderFormErrorOccurred
    );
    const orderPlaced = useSelector(
        (state: RootState) => state.order.orderPlaced
    );
    const placedOrderId = useSelector(
        (state: RootState) => state.order.placedOrderId
    );
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderPlaced)
            dispatch(placeOrder(orderFormData, cancelToken));
        return () => cancelToken.cancel();
    }, [orderFormData, orderPlaced, dispatch]);

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
                        {!orderFormIsSending && !errorOccurred &&
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
                                        Your order number is: {placedOrderId}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" align="center">
                                        You can see order details{" "}
                                        <Link
                                            to={routing.orderDetails.getPathWithParams(
                                                { orderId: placedOrderId }
                                            )}
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

export default PlaceOrderView;
