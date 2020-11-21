import { Box, Divider, Typography } from "@material-ui/core";
import React from "react";
import { Product } from "../../models";
import ProductCardTileGroup from "../ProductCardTileGroup";

interface Props {
    name: string;
    products: Product[];
}

const ProductCardNamedTileGroup = (props: Props) => (
    <div>
        <Typography variant="h6" align="center" gutterBottom>
            {props.name}
        </Typography>
        <Box mb={3}>
            <Divider />
        </Box>
        <ProductCardTileGroup products={props.products} />
    </div>
);

export default ProductCardNamedTileGroup;
