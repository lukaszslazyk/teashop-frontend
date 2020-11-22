import { Fab, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { CartItem } from "../../../../domain/cart/models";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./styles";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { calculateItemPrice } from "../../../../domain/cart/services/cartService";

interface Props {
    cartItem: CartItem;
    interactionDisabled: boolean;
    updateItemQuantityCallback: (productId: string, quantity: number) => void;
    removeItemFromCartCallback: (productId: string) => void;
}

const CartItemListElement = (props: Props) => {
    const classes = useStyles();
    const [ownInteractionDisabled, setOwnInteractionDisabled] =
        React.useState(false);
    
    const handleQuantityChanged = (value: number) => {
        setOwnInteractionDisabled(true);
        props.updateItemQuantityCallback(props.cartItem.product.id, value);
    };

    const handleRemoveButtonClick = () => {
        setOwnInteractionDisabled(true);
        props.removeItemFromCartCallback(props.cartItem.product.id);
    };

    const interactionDisabled = props.interactionDisabled;
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
            <Grid item>
                <img
                    src={getImageFullUrl(props.cartItem.product.imagePath)}
                    alt="product"
                    className={classes.image}
                />
            </Grid>
            <Grid item className={classes.contentContainer}>
                <Grid container alignItems="center" spacing={3}>
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
                            spacing={3}
                            className={classes.buttonsContainer}
                        >
                            <Grid item>
                                <ProductQuantityPicker
                                    initialValue={props.cartItem.quantity}
                                    pricedByWeight={
                                        props.cartItem.product
                                            .quantityPerPrice > 1
                                    }
                                    quantityChangedCallback={
                                        handleQuantityChanged
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
        </Grid>
    );
};

export default CartItemListElement;
