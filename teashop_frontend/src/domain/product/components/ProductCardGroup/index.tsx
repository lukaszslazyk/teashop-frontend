import { Grid } from "@material-ui/core";
import React from "react";
import { Product } from "../../models";
import ProductCard from "../ProductCard";

interface Props {
    products?: Product[];
    isPlaceholder?: boolean;
    numberOfPlaceholderCards?: number;
}

const ProductCardGroup = (props: Props) => (
    <Grid container spacing={3} justify="center">
        {props.isPlaceholder &&
            [...Array(props.numberOfPlaceholderCards)].map((_, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                    <ProductCard />
                </Grid>
            ))}
        {!props.isPlaceholder &&
            props.products &&
            props.products.map(product => (
                <Grid item xs={6} sm={4} md={3} key={product.id}>
                    <ProductCard product={product} />
                </Grid>
            ))}
    </Grid>
);

export default ProductCardGroup;
