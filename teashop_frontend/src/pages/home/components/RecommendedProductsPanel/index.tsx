import { Grid, Typography } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import React from "react";
import ProductCardTileGroup from "../../../../domain/product/components/ProductCardTileGroup";
import ProductCardTileGroupPlaceholder from "../../../../domain/product/components/ProductCardTileGroup/placeholder";
import useLogic from "./logic";

const RecommendedProductsPanel = () => {
    const logic = useLogic();
    const { products, productsAreFetching, anyErrors } = logic;

    return (
        <Grid container spacing={2}>
            <Grid
                item
                xs={12}
                container
                spacing={2}
                justify="center"
                alignItems="center"
            >
                <EcoIcon color="primary" fontSize="large" />
                <Grid item>
                    <Typography variant="h5" color="primary" align="center">
                        Discover new flavours
                    </Typography>
                </Grid>
                <EcoIcon color="primary" fontSize="large" />
            </Grid>
            <Grid item xs={12}>
                {productsAreFetching || anyErrors() ? (
                    <ProductCardTileGroupPlaceholder numberOfCards={5} />
                ) : (
                    <ProductCardTileGroup products={products} />
                )}
            </Grid>
        </Grid>
    );
};

export default RecommendedProductsPanel;
