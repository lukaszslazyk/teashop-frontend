import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { OrderDetailsPageParams } from "../../configuration/routing";
import { fetchOrder } from "../../domain/order/actions";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import OrderDetailsInfoView from "./components/OrderDetailsInfoView";
import OrderDetailsItemsView from "./components/OrderDetailsItemsView";
import OrderDetailsPriceView from "./components/OrderDetailsPriceView";

const OrderDetailsPage = () => {
    const order = useSelector((state: RootState) => state.order.order);
    const orderIsFetching = useSelector(
        (state: RootState) => state.order.orderIsFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.order.orderErrorOccurred
    );
    const dispatch = useDispatch();
    const { orderId } = useParams<OrderDetailsPageParams>();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchOrder(orderId, cancelToken));
        return () => cancelToken.cancel();
    }, [orderId, dispatch]);

    return (
        <MainLayout>
            {orderIsFetching && <PageLoadingProgress />}
            {!orderIsFetching && errorOccurred && (
                <ErrorInfo errorMessage="Order is currently unavailable." />
            )}
            {!orderIsFetching && !errorOccurred && (
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
                        <OrderDetailsInfoView order={order} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsItemsView order={order} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsPriceView order={order} />
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default OrderDetailsPage;
