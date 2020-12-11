import { Divider, Grid, Hidden, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { CartItem } from "../../../../domain/cart/models";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import CartItemListElementMenuButtonGroup from "../CartItemListElementMenuButtonGroup";
import CartItemListElementMobileMenu from "../CartItemListElementMobileMenu";
import EditItemQuantityDialog from "../EditItemQuantityDialog";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    cartItem: CartItem;
}

const CartItemListElement = (props: Props) => {
    const logic = useLogic(props.cartItem);
    const classes = useStyles();
    const { showProgress, openEditQuantityDialog } = logic;

    return (
        <Grid container className={classes.root}>
            <Grid item container className={classes.imageContainer}>
                <img
                    src={getImageFullUrl(props.cartItem.product.imagePath)}
                    alt="product"
                    className={classes.image}
                />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid
                item
                container
                spacing={3}
                className={classes.contentContainer}
            >
                <Grid
                    item
                    sm="auto"
                    xs={12}
                    container
                    spacing={1}
                    className={classes.titlePartContainer}
                >
                    <Grid item className={classes.productNameTextContainer}>
                        <Typography
                            variant="h6"
                            component={Link}
                            to={routing.productDetails.getPathWithParams({
                                productId: props.cartItem.product.id,
                            })}
                            className={classes.productNameText}
                        >
                            {props.cartItem.product.name}
                        </Typography>
                    </Grid>
                    <Hidden mdUp>
                        <Grid item className={classes.mobileMenuContainer}>
                            <CartItemListElementMobileMenu
                                showProgress={showProgress}
                                onEditMenuItemClick={logic.handleEditClicked}
                                onRemoveMenuItemClick={logic.handleRemoveClicked}
                            />
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid
                    item
                    sm="auto"
                    xs={12}
                    container
                    spacing={2}
                    className={classes.bodyPartContainer}
                >
                    <Grid item>
                        <Typography
                            variant="body1"
                            className={classes.valueText}
                        >
                            {getPriceTextWithCurrency(
                                calculateItemPrice(props.cartItem)
                            )}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant="body1"
                            className={classes.valueText}
                        >
                            Quantity: {props.cartItem.quantity}{" "}
                            {pricedByWeight(props.cartItem.product) ? "g" : ""}
                        </Typography>
                    </Grid>
                    <Hidden smDown>
                        <Grid item>
                            {" "}
                            <CartItemListElementMenuButtonGroup
                                showProgress={showProgress}
                                onEditButtonClick={logic.handleEditClicked}
                                onRemoveButtonClick={logic.handleRemoveClicked}
                            />
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
            <EditItemQuantityDialog
                open={openEditQuantityDialog}
                cartItem={props.cartItem}
                onClose={logic.handleEditQuantityDialogClose}
            />
        </Grid>
    );
};

export default CartItemListElement;
