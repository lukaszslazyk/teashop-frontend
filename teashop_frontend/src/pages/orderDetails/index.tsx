import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { OrderDetailsPageParams } from "../../configuration/routing";
import { Order } from "../../domain/order/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
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

const OrderDetailsPage = (props: Props) => {
    const { orderId } = useParams<OrderDetailsPageParams>();
    const { fetchOrder } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        fetchOrder(orderId, cancelToken);
        return () => cancelToken.cancel();
    }, [orderId, fetchOrder]);

    return (
        <MainLayout>
            {props.isFetching && (
                <PageLoadingProgress />
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
