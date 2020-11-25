import { Divider, Fab, Grid, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../../domain/cart/models";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import useStyles from "./styles";

interface Props {
    cartItem: CartItem;
    interactionDisabled: boolean;
    updateItemQuantityCallback: (productId: string, quantity: number) => void;
    removeItemFromCartCallback: (productId: string) => void;
    quantityInvalidCallback: () => void;
    quantityValidCallback: () => void;
}

const CartItemListElement = (props: Props) => {
    const classes = useStyles();
    const [ownInteractionDisabled, setOwnInteractionDisabled] = useState(false);
    const { interactionDisabled } = props;

    const handleQuantityChanged = (value: number) => {
        setOwnInteractionDisabled(true);
        props.updateItemQuantityCallback(props.cartItem.product.id, value);
    };

    const handleRemoveButtonClick = () => {
        setOwnInteractionDisabled(true);
        props.removeItemFromCartCallback(props.cartItem.product.id);
    };

    useEffect(() => {
        if (!interactionDisabled)
            setOwnInteractionDisabled(false);
    }, [interactionDisabled, setOwnInteractionDisabled]);

    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            spacing={3}
            className={classes.root}
        >
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
                <Grid item className={classes.productNameTextContainer}>
                    <Typography variant="h6">
                        {props.cartItem.product.name}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        {calculateItemPrice(props.cartItem).toFixed(2)} EUR
                    </Typography>
                </Grid>
                <Grid item>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                        spacing={3}
                    >
                        <Grid item>
                            <ProductQuantityPicker
                                initialValue={props.cartItem.quantity}
                                pricedByWeight={
                                    props.cartItem.product.quantityPerPrice > 1
                                }
                                quantityChangedCallback={handleQuantityChanged}
                                quantityInvalidCallback={
                                    props.quantityInvalidCallback
                                }
                                quantityValidCallback={
                                    props.quantityValidCallback
                                }
                                interactionDisabled={ownInteractionDisabled}
                            />
                        </Grid>
                        <Grid item>
                            <Fab
                                size="small"
                                onClick={handleRemoveButtonClick}
                                disabled={ownInteractionDisabled}
                                className={classes.removeButton}
                            >
                                <DeleteIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CartItemListElement;
