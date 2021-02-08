import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import EcoIcon from "@material-ui/icons/Eco";
import React from "react";
import RecommendedProductsCardGroup from "../RecommendedProductsCardGroup";
import useLogic from "./logic";
import useStyles from "./styles";

const RecommendedProductsPanel = () => {
    const { products, productsAreFetching, anyErrors } = useLogic();
    const classes = useStyles();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

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
