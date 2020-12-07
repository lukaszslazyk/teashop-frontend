import { Divider, Grid, Hidden, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartItem } from "../../../../domain/cart/models";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../../../shared/services/requestCancelTokenService";
import CartItemListElementMenuButtonGroup from "../CartItemListElementMenuButtonGroup";
import CartItemListElementMobileMenu from "../CartItemListElementMobileMenu";
import EditItemQuantityDialogContainer from "../EditItemQuantityDialog/container";
import useStyles from "./styles";

interface Props {
    cartItem: CartItem;
    cartUpdateIsSending: boolean;
    removeItemFromCart: (
        productId: string,
        cancelToken: RequestCancelToken
    ) => void;
}

const CartItemListElement = (props: Props) => {
    const classes = useStyles();
    const [showProgress, setShowProgress] = useState(false);
    const [openEditQuantityDialog, setOpenEditQuantityDialog] = useState(false);
    const { cartUpdateIsSending } = props;

    const handleEditClicked = () =>
        setOpenEditQuantityDialog(true);

    const handleEditQuantityDialogClose = () =>
        setOpenEditQuantityDialog(false);

    const handleRemoveClicked = () => {
        props.removeItemFromCart(
            props.cartItem.product.id,
            createRequestCancelToken()
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
                            to={`/product/${props.cartItem.product.id}`}
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
                            {calculateItemPrice(props.cartItem).toFixed(2)} EUR
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
            <EditItemQuantityDialogContainer
                open={openEditQuantityDialog}
                cartItem={props.cartItem}
                onClose={handleEditQuantityDialogClose}
            />
        </Grid>
    );
};

export default CartItemListElement;
