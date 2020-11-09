import { Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import useErrorSnackbar from "../../common/hooks/useErrorSnackbar";
import MainLayout from "../../layout/main";
import ProductCardTileGroup from "../../product/components/ProductCardTileGroup";
import { Product } from "../../product/models";
import useStyles from "./styles";

interface Props {
    products: Product[];
    isFetching: boolean;
    error: boolean;
    loadProducts: () => void;
    loadProductsInCategory: (categoryName: string) => void;
}

const BrowsePage = (props: Props) => {
    const classes = useStyles();
    const location = useLocation();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);

    const loadProducts = props.loadProducts;
    const loadProductsInCategory = props.loadProductsInCategory;
    useEffect(() => {
        if (location.pathname.includes("browse/")) {
            let categoryName = location.pathname.split("/").slice(-1)[0];
            loadProductsInCategory(categoryName);
        } else loadProducts();
    }, [location, loadProducts, loadProductsInCategory]);

    useEffect(() => {
        setTimeoutPassed(false);
        setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
    }, [location, setTimeoutPassed]);

    useErrorSnackbar(props.error);

    return (
        <MainLayout>
            {props.isFetching && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {!props.isFetching && props.products.length === 0 && (
                <Grid container justify="center">
                    <Grid item className={classes.emptyProductsInfo}>
                        <Typography variant="h3">
                            Sorry
                        </Typography>
                        <Typography variant="h6">
                            No product in this category is currently available.
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {!props.isFetching && props.products.length > 0 && (
                <ProductCardTileGroup products={props.products} />
            )}
        </MainLayout>
    );
};

export default BrowsePage;
