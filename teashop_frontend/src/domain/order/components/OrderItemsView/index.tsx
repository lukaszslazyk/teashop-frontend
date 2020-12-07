import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Cart, CartItem } from "../../../../domain/cart/models";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import useStyles from "./styles";

interface Props {
    cart: Cart;
}

const OrderItemsView = (props: Props) => {
    const classes = useStyles();

    const getItemQuantityText = (item: CartItem) => {
        if (pricedByWeight(item.product))
            return `${item.quantity}g`;
        return item.quantity;
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                    Items
                </Typography>
                <Box mb={1}>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                {props.cart.items.map((item, index) => (
                    <Grid key={item.product.id} container>
                        {index !== 0 && (
                            <Grid item xs={12}>
                                <Box my={1}>
                                    <Divider />
                                </Box>
                            </Grid>
                        )}
                        <Grid item xs={12} container alignItems="center" spacing={2} className={classes.itemContainer}>
                            <Grid item>
                                <Paper square className={classes.imageContainer}>
                                    <img
                                        src={getImageFullUrl(item.product.imagePath)}
                                        alt="product"
                                        className={classes.image}
                                    />
                                </Paper>
                            </Grid>
                            <Grid item container spacing={2} className={classes.grow}>
                                <Grid item sm={8} xs={12}>
                                    <Typography variant="body1">
                                        {item.product.name}
                                    </Typography>
                                </Grid>
                                <Grid item sm={4} xs={12} container>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" className={classes.quantityText}>
                                            {getItemQuantityText(item)}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body1" className={classes.priceText}>
                                            {calculateItemPrice(item).toFixed(2)} EUR
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index === props.cart.items.length - 1 && (
                            <Grid item xs={12}>
                                <Box my={1}>
                                    <Divider />
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default OrderItemsView;