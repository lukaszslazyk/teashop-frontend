import React from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import ProductCardTileGroup from "./ProductCardTileGroup";
import { Product } from "../types";

interface Props {
    name: string;
    products: Product[];
}

const ProductCardNamedTileGroup = (props: Props) => {
    return (
        <div>
            <Typography variant="h6" align="center" gutterBottom>
                {props.name}
            </Typography>
            <Box mb={3}><Divider /></Box>
            <ProductCardTileGroup products={props.products} />
        </div>
    );
};

export default ProductCardNamedTileGroup;
