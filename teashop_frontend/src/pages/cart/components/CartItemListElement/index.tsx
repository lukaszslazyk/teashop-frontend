import { Divider, Grid, Hidden, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../configuration/routing";
import { removeItemFromSessionCart } from "../../../../domain/cart/actions";
import { CartItem } from "../../../../domain/cart/models";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import CartItemListElementMenuButtonGroup from "../CartItemListElementMenuButtonGroup";
import CartItemListElementMobileMenu from "../CartItemListElementMobileMenu";
import EditItemQuantityDialog from "../EditItemQuantityDialog";
import useStyles from "./styles";

interface Props {
    cartItem: CartItem;
}

const CartItemListElement = (props: Props) => {
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const dispatch = useDispatch();
    const [showProgress, setShowProgress] = useState(false);
    const [openEditQuantityDialog, setOpenEditQuantityDialog] = useState(false);
    const classes = useStyles();

    const handleEditClicked = () => setOpenEditQuantityDialog(true);

    const handleEditQuantityDialogClose = () =>
        setOpenEditQuantityDialog(false);

    const handleRemoveClicked = () => {
        dispatch(
            removeItemFromSessionCart(
                props.cartItem.product.id,
                createRequestCancelToken()
            )
        );
        setShowProgress(true);
    };

    useEffect(() => {
        if (!cartUpdateIsSending)
            setShowProgress(false);
    }, [cartUpdateIsSending]);

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
                                onEditMenuItemClick={handleEditClicked}
                                onRemoveMenuItemClick={handleRemoveClicked}
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
                                onEditButtonClick={handleEditClicked}
                                onRemoveButtonClick={handleRemoveClicked}
                            />
                        </Grid>
                    </Hidden>
                </Grid>
            </Grid>
            <EditItemQuantityDialog
                open={openEditQuantityDialog}
                cartItem={props.cartItem}
                onClose={handleEditQuantityDialogClose}
            />
        </Grid>
    );
};

export default CartItemListElement;
