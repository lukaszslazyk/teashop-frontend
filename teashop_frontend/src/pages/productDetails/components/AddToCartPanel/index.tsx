import { Button, CircularProgress, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React from "react";
import ProductQuantityPicker from "../../../../domain/product/components/ProductQuantityPicker";
import { Product } from "../../../../domain/product/models";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    product: Product;
    onQuantityChange: (value: number) => void;
}

const AddToCartPanel = (props: Props) => {
    const {
        cartUpdateIsSending,
        handleQuantityChanged,
        handleAddToChartButtonClicked,
        addToCartButtonDisabled,
    } = useLogic(props.product, props.onQuantityChange);
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid
                item
                xs={12}
                container
                className={classes.productQuantityPickerContainer}
            >
                <ProductQuantityPicker
                    product={props.product}
                    onQuantityChange={handleQuantityChanged}
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
