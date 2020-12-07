import { Box, CircularProgress, Divider, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Order } from "../../domain/order/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import OrderDetailsInfoView from "./components/OrderDetailsInfoView";
import OrderDetailsItemsView from "./components/OrderDetailsItemsView";
import OrderDetailsPriceView from "./components/OrderDetailsPriceView";

interface Props {
    order: Order;
    isFetching: boolean;
    errorOccurred: boolean;
    fetchOrder: (orderId: string, cancelToken: RequestCancelToken) => void;
}

interface Params {
    orderId: string;
}

const OrderDetailsPage = (props: Props) => {
    const { orderId }: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { fetchOrder } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        setTimeoutPassed(false);
        fetchOrder(orderId, cancelToken);
        return () => cancelToken.cancel();
    }, [orderId, fetchOrder]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [setTimeoutPassed]);

    return (
        <MainLayout>
            {props.isFetching && timeoutPassed && (
                <CircularProgress />
            )}
            {!props.isFetching && props.errorOccurred && (
                <ErrorInfo errorMessage="Order is currently unavailable." />
            )}
            {!props.isFetching && !props.errorOccurred && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="primary">
                            Order no. {orderId}
                        </Typography>
                        <Box mt={1}>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsInfoView order={props.order} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsItemsView order={props.order} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsPriceView order={props.order} />
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default OrderDetailsPage;
