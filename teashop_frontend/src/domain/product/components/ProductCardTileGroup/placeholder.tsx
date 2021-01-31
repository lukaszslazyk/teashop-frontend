import { Grid } from "@material-ui/core";
import React from "react";
import ProductCardPlaceholder from "../ProductCard/placeholder";

interface Props {
    numberOfCards: number;
}

const ProductCardTileGroupPlaceholder = (props: Props) => (
    <Grid container spacing={3} justify="center">
        {[...Array(props.numberOfCards)].map((_x, index) => (
            <Grid item key={index}>
                <ProductCardPlaceholder />
            </Grid>
        ))}
    </Grid>
);

export default ProductCardTileGroupPlaceholder;
