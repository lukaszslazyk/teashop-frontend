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
import { CartItem } from "../../../../domain/cart/models";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { pricedByWeight } from "../../../../domain/product/services/productService";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../../../shared/services/requestCancelTokenService";
import useStyles from "./styles";

interface Props {
    open: boolean;
    cartItem: CartItem;
    onClose: () => void;
    cartUpdateIsSending: boolean;
    updateItemQuantity: (
        productId: string,
        quantity: number,
        cancelToken: RequestCancelToken
    ) => void;
}

const EditItemQuantityDialog = (props: Props) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(props.cartItem.quantity);
    const [quantityValid, setQuantityValid] = useState(true);
    const [awaitingResponse, setAwaitingResponse] = useState(false);
    const [displayLoading, setDisplayLoading] = useState(false);
    const { open, cartUpdateIsSending, onClose } = props;

    const handleQuantityChanged = (value: number) => setQuantity(value);

    const handleQuantityValid = () => {
        if (!quantityValid)
            setQuantityValid(true);
    };

    const handleQuantityInvalid = () => {
        if (quantityValid)
            setQuantityValid(false);
    };

    const handleAcceptButtonClicked = () => {
        if (props.cartItem.quantity !== quantity) {
            props.updateItemQuantity(
                props.cartItem.product.id,
                quantity,
                createRequestCancelToken()
            );
            setAwaitingResponse(true);
            setDisplayLoading(true);
        } else
            onClose();
    };

    const handleClose = () => {
        if (!props.cartUpdateIsSending)
            props.onClose();
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
                            quantityChangedCallback={handleQuantityChanged}
                            quantityValidCallback={handleQuantityValid}
                            quantityInvalidCallback={handleQuantityInvalid}
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
                            disabled={!quantityValid || displayLoading}
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
