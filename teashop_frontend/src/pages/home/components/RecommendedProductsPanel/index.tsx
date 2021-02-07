import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import React from "react";
import RecommendedProductsCardGroup from "../RecommendedProductsCardGroup";
import useLogic from "./logic";

const RecommendedProductsPanel = () => {
    const logic = useLogic();
    const { products, productsAreFetching, anyErrors } = logic;
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

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
                <EcoIcon color="primary" fontSize="default" />
                <Grid item>
                    <Typography
                        variant={isXsScreen ? "h6" : "h5"}
                        color="primary"
                        align="center"
                    >
                        Discover new flavours
                    </Typography>
                </Grid>
                <EcoIcon color="primary" fontSize="default" />
            </Grid>
            <Grid item xs={12}>
                {productsAreFetching || anyErrors() ? (
                    <RecommendedProductsCardGroup
                        isPlaceholder
                        numberOfPlaceholderCards={5}
                    />
                ) : (
                    <RecommendedProductsCardGroup products={products} />
                )}
            </Grid>
        </Grid>
    );
};

export default RecommendedProductsPanel;
