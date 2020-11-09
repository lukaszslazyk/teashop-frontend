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

    const loadProducts = props.loadProducts;
    const loadProductsInCategory = props.loadProductsInCategory;
    useEffect(() => {
        if (location.pathname.includes("browse/")) {
            let categoryName = location.pathname.split('/').slice(-1)[0]
            loadProductsInCategory(categoryName);
        } else
            loadProducts();
    }, [location, loadProducts, loadProductsInCategory]);

    useErrorSnackbar(props.error);

    return (
        <MainLayout>
            {props.isFetching && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            <ProductCardTileGroup products={props.products} />
        </MainLayout>
    );
};

export default BrowsePage;
