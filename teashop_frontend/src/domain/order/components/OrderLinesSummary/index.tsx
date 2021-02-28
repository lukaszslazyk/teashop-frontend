import { Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { OrderLine } from "../../models";
import OrderLinesList from "../OrderLinesList";
import OrderPriceView from "../OrderPriceView";
import useStyles from "./styles";

interface Props {
    orderLines: OrderLine[];
    totalPrice: number;
    shippingFee: number;
    paymentFee: number;
}

const OrderLinesSummary = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.paperWrapper}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="primary">
                            Items
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <OrderLinesList orderLines={props.orderLines} />
                    </Grid>
                    <Grid item xs={12} className={classes.priceViewContainer}>
                        <OrderPriceView
                            totalPrice={props.totalPrice}
                            shippingFee={props.shippingFee}
                            paymentFee={props.paymentFee}
                        />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default OrderLinesSummary;
