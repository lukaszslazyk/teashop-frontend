import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Button, CircularProgress } from "@material-ui/core";
import useStyles from "./styles";

interface Props {
    isProcessing: boolean;
    addItemToSessionCartCallback: () => void;
}

const AddToCartButton = (props: Props) => {
    const classes = useStyles();
    
    return (
        <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={props.addItemToSessionCartCallback}
            disabled={props.isProcessing}
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
