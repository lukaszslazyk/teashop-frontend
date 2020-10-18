import React from "react";
import { Grid } from "@material-ui/core";
import ProductCard from "../ProductCard";
import { Product } from "../../models";

interface Props {
    products: Product[];
}

const ProductCardTileGroup = (props: Props) => {
    return (
        <Grid container spacing={3} justify="center">
            {props.products.map((product) => (
                <Grid item key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductCardTileGroup;
