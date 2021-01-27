import { Grid } from "@material-ui/core";
import React from "react";
import { Product } from "../../../../domain/product/models";
import BrewingInfoDisplay from "../BrewingInfoDisplay";
import DescriptionDisplay from "../DescriptionDisplay";

interface Props {
    product: Product;
}

const ProductDetailsContentBody = (props: Props) => {
    const nullOrEmpty = (input: string | undefined): boolean =>
        !input || input.trim().length === 0;

    return (
        <Grid container spacing={3}>
            {!nullOrEmpty(props.product.description) && (
                <Grid item xs={12}>
                    <DescriptionDisplay
                        description={props.product.description}
                    />
                </Grid>
            )}
            {props.product.brewingInfo && (
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
