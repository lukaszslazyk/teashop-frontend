import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import React from "react";
import RecommendedProductsCardGroup from "../RecommendedProductsCardGroup";
import useLogic from "./logic";
import useStyles from "./styles";

const numberOfProductsOnRegularScreen = 5;
const numberOfProductsOnXsScreen = 4;

const RecommendedProductsPanel = () => {
    const { products, productsAreFetching, anyErrors } = useLogic(
        numberOfProductsOnRegularScreen,
        numberOfProductsOnXsScreen
    );
    const classes = useStyles();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
    const numberOfProductsToDisplay = isXsScreen
        ? numberOfProductsOnXsScreen
        : numberOfProductsOnRegularScreen;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography
                    variant={isXsScreen ? "h6" : "h5"}
                    color="primary"
                    align="center"
                    className={classes.title}
                >
                    <EcoIcon
                        color="primary"
                        fontSize="inherit"
                        className={classes.titleLeftIcon}
                    />
                    Discover new flavours
                    <EcoIcon
                        color="primary"
                        fontSize="inherit"
                        className={classes.titleRightIcon}
                    />
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {productsAreFetching || anyErrors() ? (
                    <RecommendedProductsCardGroup
                        isPlaceholder
                        numberOfPlaceholderCards={numberOfProductsToDisplay}
                    />
                ) : (
                    <RecommendedProductsCardGroup
                        products={products.slice(0, numberOfProductsToDisplay)}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default RecommendedProductsPanel;
