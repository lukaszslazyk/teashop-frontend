import { Box, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { CartItem } from "../../../../domain/cart/models";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import useStyles from "./styles";

interface Props {
    items: CartItem[];
}

const getItemQuantityText = (item: CartItem) => {
    if (pricedByWeight(item.product))
        return `${item.quantity}g`;
    return item.quantity;
};

const OrderItemsList = (props: Props) => {
    const classes = useStyles();

    return (
        <div>
            {props.items.map((item, index) => (
                <Grid key={item.product.id} container>
                    <Grid item xs={12}>
                        <Box my={1}>
                            <Divider />
                        </Box>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        spacing={2}
                        alignItems="center"
                        className={classes.itemContainer}
                    >
                        <Grid item>
                            <Paper
                                square
                                variant="outlined"
                                className={classes.imageContainer}
                            >
                                <img
                                    src={getImageFullUrl(
                                        item.product.imagePath
                                    )}
                                    alt="product"
                                    className={classes.image}
                                />
                            </Paper>
                        </Grid>
                        <Grid
                            item
                            container
                            spacing={2}
                            className={classes.grow}
                        >
                            <Grid item sm={8} xs={12}>
                                <Typography
                                    variant="body1"
                                    component={Link}
                                    to={routing.productDetails.getPathWithParams({
                                        productId: item.product.id,
                                    })}
                                    className={classes.productNameText}
                                >
                                    {item.product.name}
                                </Typography>
                            </Grid>
                            <Grid item sm={4} xs={12} container>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body1"
                                        className={classes.quantityText}
                                    >
                                        {getItemQuantityText(item)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body1"
                                        className={classes.priceText}
                                    >
                                        {getPriceTextWithCurrency(
                                            calculateItemPrice(item)
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {index === props.items.length - 1 && (
                        <Grid item xs={12}>
                            <Box my={1}>
                                <Divider />
                            </Box>
                        </Grid>
                    )}
                </Grid>
            ))}
        </div>
    );
};

export default OrderItemsList;
