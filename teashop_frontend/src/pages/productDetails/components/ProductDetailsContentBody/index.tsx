import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { Product } from "../../../../domain/product/models";
import BrewingInfoDisplay from "../BrewingInfoDisplay";

interface Props {
    product: Product | null;
}

const ProductDetailsContentBody = (props: Props) => {
    const nullOrEmpty = (input: string | undefined): boolean => {
        return !input || input.trim().length === 0;
    };

    return (
        <Grid container spacing={3}>
            {!nullOrEmpty(props.product?.description) && (
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {props.product?.description}
                    </Typography>
                </Grid>
            )}
            {props.product?.brewingInfo && (
                <Grid item xs={12}>
                    <BrewingInfoDisplay
                        brewingInfo={props.product.brewingInfo}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default ProductDetailsContentBody;
