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
    const logic = useLogic(props.open, props.cartItem, props.onClose);
    const classes = useStyles();
    const { displayLoading } = logic;

    return (
        <Dialog open={props.open} onClose={logic.handleClose}>
            <DialogTitle>Edit quantity</DialogTitle>
            <DialogContent>
                <Grid container className={classes.content}>
                    {displayLoading ? (
                        <CircularProgress />
                    ) : (
                        <ProductQuantityPicker
                            product={props.cartItem.product}
                            onQuantityChange={logic.handleQuantityChanged}
                            initialValue={props.cartItem.quantity}
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
                            onClick={logic.handleAcceptButtonClicked}
                            color="primary"
                            disabled={logic.addToCartButtonDisabled()}
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
