import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Cart } from "../../../cart/models";
import OrderItemsList from "../OrderItemList";
import OrderPriceView from "../OrderPriceView";
import useStyles from "./styles";

interface Props {
    cart: Cart;
    totalPrice: number;
    shippingFee: number;
    paymentFee: number;
}

const OrderItemsSummary = (props: Props) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper className={classes.paperWrapper}>
                    <Grid item xs={12}>
                        <Typography variant="h6" color="primary">
                            Items
                        </Typography>
                        <Box mb={1}>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <OrderItemsList items={props.cart.items} />
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

export default OrderItemsSummary;
