import { Button, CircularProgress, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useState } from "react";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { Product } from "../../../../domain/product/models";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../../../shared/services/requestCancelTokenService";
import useAddItemToCartResponseNotifyEffect from "../../hooks/useAddItemToCartResponseNotifyEffect";
import useStyles from "./styles";

interface Props {
    product: Product;
    onQuantityChange: (value: number) => void;
    cartIsSending: boolean;
    cartErrorOccurred: boolean;
    addItemToSessionCart: (
        product: Product,
        quantity: number,
        cancelToken: RequestCancelToken
    ) => void;
}

const AddToCartPanel = (props: Props) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(props.product.quantityPerPrice);
    const [quantityPickerValid, setQuantityPickerValid] = useState(true);
    const [
        quantityPickerTextInputFocused,
        setQuantityPickerTextInputFocused,
    ] = useState(false);

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
            props.addItemToSessionCart(
                props.product,
                quantity,
                createRequestCancelToken()
            );
    };

    useAddItemToCartResponseNotifyEffect(
        props.cartIsSending,
        props.cartErrorOccurred
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
                    disabled={
                        props.cartIsSending ||
                        !quantityPickerValid ||
                        quantityPickerTextInputFocused
                    }
                >
                    {props.cartIsSending ? (
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
