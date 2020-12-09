import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { OrderFormData } from "../../../../domain/order/models";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../../../shared/services/requestCancelTokenService";
import useStyles from "./styles";

interface Props {
    orderFormData: OrderFormData;
    isSending: boolean;
    errorOccurred: boolean;
    orderPlaced: boolean;
    placedOrderId: string;
    placeOrder: (
        orderFormData: OrderFormData,
        cancelToken: RequestCancelToken
    ) => void;
}

const PlaceOrderView = (props: Props) => {
    const classes = useStyles();
    const { orderFormData, orderPlaced, placeOrder } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderPlaced)
            placeOrder(orderFormData, cancelToken);
        return () => cancelToken.cancel();
    }, [orderFormData, orderPlaced, placeOrder]);

    return (
        <Grid container spacing={1} className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.statusIconContainer}>
                    {props.isSending && (
                        <CircularProgress
                            size={100}
                            className={classes.progress}
                        />
                    )}
                    {!props.isSending && props.errorOccurred && (
                        <CancelIcon className={classes.failIcon} />
                    )}
                    {!props.isSending && !props.errorOccurred && (
                        <CheckCircleIcon className={classes.successIcon} />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center">
                        {props.isSending && "Please wait"}
                        {!props.isSending && props.errorOccurred && "Sorry"}
                        {!props.isSending &&
                            !props.errorOccurred &&
                            "Your order has been placed successfully"}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {props.isSending && (
                        <Typography variant="h6" align="center">
                            We are processing your order
                        </Typography>
                    )}
                    {!props.isSending && props.errorOccurred && (
                        <Typography variant="h6" align="center">
                            We've encountered some problems while processing
                            your request.
                            <br />
                            Please reload page and try again.
                        </Typography>
                    )}
                    {!props.isSending && !props.errorOccurred && (
                        <Grid item xs={12}>
                            <Grid container spacing={2} justify="center">
                                <Grid item xs={12}>
                                    <Typography variant="h6" align="center">
                                        Your order number is:{" "}
                                        {props.placedOrderId}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1" align="center">
                                        You can see order details{" "}
                                        <Link
                                            to={routing.orderDetails.getPathWithParams(
                                                { orderId: props.placedOrderId }
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
