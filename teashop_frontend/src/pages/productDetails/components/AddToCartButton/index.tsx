import { Button, CircularProgress } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import useStyles from "./styles";

interface Props {
    isProcessing: boolean;
    addItemToSessionCartCallback: () => void;
    interactionDisabled?: boolean;
}

const AddToCartButton = (props: Props) => {
    const classes = useStyles();

    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={props.addItemToSessionCartCallback}
            disabled={props.isProcessing || props.interactionDisabled}
        >
            {props.isProcessing ? (
                <CircularProgress
                    className={classes.progressIndicator}
                    size={20}
                />
            ) : (
                <ShoppingCartIcon className={classes.icon} />
            )}
            Add to cart
        </Button>
    );
};

export default AddToCartButton;
