import { Box, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import OrderDetailsInfoView from "./components/OrderDetailsInfoView";
import OrderDetailsItemsView from "./components/OrderDetailsItemsView";
import OrderDetailsPriceView from "./components/OrderDetailsPriceView";
import useLogic from "./logic";
import useStyles from "./styles";

const OrderDetailsPage = () => {
    const logic = useLogic();
    const classes = useStyles();
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
                        <Typography variant="h5" color="primary">
                            Order no. {order.orderNo}
                        </Typography>
                        <Box my={1}>
                            <Divider />
                        </Box>
                        <Typography className={classes.placementDateText}>
                            Placement date: {logic.getPlacementDateText()}
                        </Typography>
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
        </div>
    );
};

export default OrderDetailsPage;
