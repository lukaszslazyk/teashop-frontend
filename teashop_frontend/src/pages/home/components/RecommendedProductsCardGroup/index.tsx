import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import ProductCard from "../../../../domain/product/components/ProductCard";
import { Product } from "../../../../domain/product/models";
import useStyles from "./styles";

interface Props {
    products?: Product[];
    isPlaceholder?: boolean;
    numberOfPlaceholderCards?: number;
}

const RecommendedProductsCardGroup = (props: Props) => {
    const theme = useTheme();
    const isUpMdScreen = useMediaQuery(theme.breakpoints.up("md"));
    const classes = useStyles();

    return (
        <Grid
            container
            justify={isUpMdScreen ? "space-between" : "center"}
            spacing={isUpMdScreen ? 0 : 2}
        >
            {props.isPlaceholder &&
                [...Array(props.numberOfPlaceholderCards)].map((_, index) => (
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        className={classes.productCardsContainer}
                        key={index}
                    >
                        <ProductCard />
                    </Grid>
                ))}
            {!props.isPlaceholder &&
                props.products &&
                props.products.map(product => (
                    <Grid
                        item
                        xs={6}
                        sm={4}
                        className={classes.productCardsContainer}
                        key={product.id}
                    >
                        <ProductCard product={product} />
                    </Grid>
                ))}
        </Grid>
    );
};

export default RecommendedProductsCardGroup;
