import { Grid } from "@material-ui/core";
import React from "react";
import ProductCardLoadingPlaceholder from "../ProductCardLoadingPlaceholder";

interface Props {
    numberOfCards: number;
}

const ProductCardLoadingPlaceholderTileGroup = (props: Props) => (
    <Grid container spacing={3} justify="center">
        {[...Array(props.numberOfCards)].map(index => (
            <Grid item key={index}>
                <ProductCardLoadingPlaceholder />
            </Grid>
        ))}
    </Grid>
);

export default ProductCardLoadingPlaceholderTileGroup;
