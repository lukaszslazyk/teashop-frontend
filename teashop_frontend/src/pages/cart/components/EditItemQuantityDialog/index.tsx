import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { updateSessionCartItemQuantity } from "../../../../domain/cart/actions";
import { CartItem } from "../../../../domain/cart/models";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import useStyles from "./styles";

interface Props {
    open: boolean;
    cartItem: CartItem;
    onClose: () => void;
}

const EditItemQuantityDialog = (props: Props) => {
    const cartUpdateIsSending = useSelector(
        (state: RootState) => state.cart.cartUpdateIsSending
    );
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const [quantityPickerValid, setQuantityPickerValid] = useState(true);
    const [
        quantityPickerTextInputFocused,
        setQuantityPickerTextInputFocused,
    ] = useState(false);
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);
    const { open, onClose } = props;
    const classes = useStyles();

    const handleQuantityChanged = (value: number, valid: boolean) => {
        setQuantityPickerValid(valid);
        if (valid)
            setQuantity(value);
    };

    const handleQuantityTextInputFocus = () =>
        setQuantityPickerTextInputFocused(true);

    const handleQuantityTextInputBlur = () =>
        setQuantityPickerTextInputFocused(false);

    const handleAcceptButtonClicked = () => {
        if (props.cartItem.quantity !== quantity && quantityPickerValid) {
            dispatch(
                updateSessionCartItemQuantity(
                    props.cartItem.product.id,
                    quantity,
                    createRequestCancelToken()
                )
            );
            setAwaitingResponse(true);
            setDisplayLoading(true);
        } else
            onClose();
    };

    const handleClose = () => {
        if (!cartUpdateIsSending) {
            setQuantityPickerValid(true);
            setQuantityPickerTextInputFocused(false);
            props.onClose();
        }
    };

    useEffect(() => {
        if (open)
            setDisplayLoading(false);
    }, [open, setDisplayLoading]);

    useEffect(() => {
        if (!cartUpdateIsSending && awaitingResponse) {
            setAwaitingResponse(false);
            onClose();
        }
    }, [cartUpdateIsSending, awaitingResponse, onClose]);

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Edit quantity</DialogTitle>
            <DialogContent>
                <Grid container className={classes.content}>
                    {displayLoading ? (
                        <CircularProgress />
                    ) : (
                        <ProductQuantityPicker
                            initialValue={props.cartItem.quantity}
                            pricedByWeight={pricedByWeight(
                                props.cartItem.product
                            )}
                            onQuantityChange={handleQuantityChanged}
                            onQuantityTextInputFocus={
                                handleQuantityTextInputFocus
                            }
                            onQuantityTextInputBlur={
                                handleQuantityTextInputBlur
                            }
                        />
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item className={classes.grow}>
                        <Button
                            onClick={props.onClose}
                            disabled={displayLoading}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={handleAcceptButtonClicked}
                            color="primary"
                            disabled={
                                displayLoading ||
                                !quantityPickerValid ||
                                quantityPickerTextInputFocused
                            }
                        >
                            Accept
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default EditItemQuantityDialog;
