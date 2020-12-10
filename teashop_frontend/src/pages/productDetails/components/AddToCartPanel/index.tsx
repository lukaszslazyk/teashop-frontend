import { Button, CircularProgress, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { addItemToSessionCart } from "../../../../domain/cart/actions";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { Product } from "../../../../domain/product/models";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import useAddItemToCartResponseNotifyEffect from "../../hooks/useAddItemToCartResponseNotifyEffect";
import useStyles from "./styles";

interface Props {
    product: Product;
    onQuantityChange: (value: number) => void;
}

const AddToCartPanel = (props: Props) => {
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const cartErrorOccurred = useSelector(
        (state: RootState) => state.cart.errorOccurred
    );
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(props.product.quantityPerPrice);
    const [quantityPickerValid, setQuantityPickerValid] = useState(true);
    const [
        quantityPickerTextInputFocused,
        setQuantityPickerTextInputFocused,
    ] = useState(false);
    const classes = useStyles();

    const handleQuantityChanged = (value: number, valid: boolean) => {
        setQuantityPickerValid(valid);
        if (valid) {
            setQuantity(value);
            props.onQuantityChange(value);
        }
    };

    const handleQuantityTextInputFocus = () =>
        setQuantityPickerTextInputFocused(true);

    const handleQuantityTextInputBlur = () =>
        setQuantityPickerTextInputFocused(false);

    const handleAddToChartButtonClicked = () => {
        if (quantityPickerValid)
            dispatch(
                addItemToSessionCart(
                    props.product,
                    quantity,
                    createRequestCancelToken()
                )
            );
    };

    const addToCartButtonDisabled = () =>
        cartUpdateIsSending ||
        !quantityPickerValid ||
        quantityPickerTextInputFocused;

    useAddItemToCartResponseNotifyEffect(
        cartUpdateIsSending,
        cartErrorOccurred
    );

    return (
        <Grid container spacing={3}>
            <Grid
                item
                xs={12}
                container
                className={classes.productQuantityPickerContainer}
            >
                <ProductQuantityPicker
                    initialValue={props.product.quantityPerPrice}
                    pricedByWeight={pricedByWeight(props.product)}
                    onQuantityChange={handleQuantityChanged}
                    onQuantityTextInputFocus={handleQuantityTextInputFocus}
                    onQuantityTextInputBlur={handleQuantityTextInputBlur}
                />
            </Grid>
            <Grid
                item
                xs={12}
                container
                className={classes.addToCartButtonContainer}
            >
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.addToCartButton}
                    onClick={handleAddToChartButtonClicked}
                    disabled={addToCartButtonDisabled()}
                >
                    {cartUpdateIsSending ? (
                        <CircularProgress
                            className={classes.progressIndicator}
                            size={20}
                        />
                    ) : (
                        <ShoppingCartIcon className={classes.icon} />
                    )}
                    Add to cart
                </Button>
            </Grid>
        </Grid>
    );
};

export default AddToCartPanel;
