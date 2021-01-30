import { Grid } from "@material-ui/core";
import React from "react";
import { Product } from "../../models";
import ProductCard from "../ProductCard";

interface Props {
    products: Product[];
}

const ProductCardTileGroup = (props: Props) => (
    <Grid container spacing={3} justify="center">
        {props.products.map(product => (
            <Grid item key={product.id}>
                <ProductCard product={product} />
            </Grid>
        ))}
    </Grid>
);

export default ProductCardTileGroup;
