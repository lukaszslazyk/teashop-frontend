import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
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
}

const BrowsePage = (props: Props) => {
    const classes = useStyles();

    const loadProducts = props.loadProducts;
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

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
