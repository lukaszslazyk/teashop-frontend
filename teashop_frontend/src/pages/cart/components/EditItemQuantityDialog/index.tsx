import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
} from "@material-ui/core";
import React from "react";
import { CartItem } from "../../../../domain/cart/models";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    open: boolean;
    cartItem: CartItem;
    onClose: () => void;
}

const EditItemQuantityDialog = (props: Props) => {
    const {
        displayLoading,
        handleQuantityChanged,
        handleAcceptButtonClicked,
        handleClose,
        addToCartButtonDisabled,
    } = useLogic(props.open, props.cartItem, props.onClose);
    const classes = useStyles();

    return (
        <Dialog
            disableBackdropClick
            open={props.open}
            onClose={handleClose}
        >
            <DialogTitle>Edit quantity</DialogTitle>
            <DialogContent>
                <Grid container className={classes.content}>
                    {displayLoading ? (
                        <CircularProgress />
                    ) : (
                        <ProductQuantityPicker
                            product={props.cartItem.product}
                            onQuantityChange={handleQuantityChanged}
                            initialValue={props.cartItem.quantity}
                        />
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid container>
                    <Grid item className={classes.grow}>
                        <Button onClick={handleClose} disabled={displayLoading}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={handleAcceptButtonClicked}
                            disabled={addToCartButtonDisabled()}
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
