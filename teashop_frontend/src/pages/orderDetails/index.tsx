import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import OrderDetailsInfoView from "./components/OrderDetailsInfoView";
import OrderDetailsItemsView from "./components/OrderDetailsItemsView";
import OrderDetailsPriceView from "./components/OrderDetailsPriceView";
import useLogic from "./logic";

const OrderDetailsPage = () => {
    const logic = useLogic();
    const { order, orderId, orderIsFetching, errorOccurred } = logic;

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
