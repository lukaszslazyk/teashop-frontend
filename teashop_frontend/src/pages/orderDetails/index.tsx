import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import OrderDetailsCustomerProvidedInfoView from "./components/OrderDetailsCustomerProvidedInfoView";
import OrderDetailsItemsSummary from "./components/OrderDetailsItemsSummary";
import OrderDetailsTopInfoView from "./components/OrderDetailsTopInfoView";
import useLogic from "./logic";

const OrderDetailsPage = () => {
    const logic = useLogic();
    const { order, orderIsFetching, errorOccurred } = logic;

    return (
        <div>
            {orderIsFetching && <PageLoadingProgress />}
            {!orderIsFetching && errorOccurred && (
                <ErrorInfo errorMessage={logic.getErrorMessage()} />
            )}
            {!orderIsFetching && !errorOccurred && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="primary">
                            Order no. {order.orderNo}
                        </Typography>
                        <Box mt={2}>
                            <OrderDetailsTopInfoView
                                placementDate={order.placementDate}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsCustomerProvidedInfoView order={order} />
                    </Grid>
                    <Grid item xs={12}>
                        <OrderDetailsItemsSummary order={order} />
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default OrderDetailsPage;
