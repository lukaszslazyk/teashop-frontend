import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import ErrorInfo from "../../shared/components/ErrorInfo";
import MainLayout from "../../layouts/main";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import { Product } from "../../domain/product/models";
import useStyles from "./styles";
import { CancelToken, createCancelToken } from "../../shared/utils/cancelToken";

interface Props {
    products: Product[];
    isFetching: boolean;
    errorOccurred: boolean;
    loadProducts: () => void;
    loadProductsInCategory: (
        categoryName: string,
        cancelToken: CancelToken
    ) => void;
}

interface Params {
    categoryName: string | undefined;
}

const BrowsePage = (props: Props) => {
    const classes = useStyles();
    const { categoryName }: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);

    const { loadProducts, loadProductsInCategory } = props;
    useEffect(() => {
        const cancelToken = createCancelToken();
        setTimeoutPassed(false);
        categoryName
            ? loadProductsInCategory(categoryName, cancelToken)
            : loadProducts();
        return () => cancelToken.cancel();
    }, [categoryName, loadProducts, loadProductsInCategory]);

    useEffect(() => {
        let timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeoutPassed]);

    return (
        <MainLayout>
            {props.isFetching && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {!props.isFetching && props.products.length === 0 && (
                <ErrorInfo errorMessage="No product in this category is currently available." />
            )}
            {!props.isFetching && props.products.length > 0 && (
                <ProductCardTileGroup products={props.products} />
            )}
        </MainLayout>
    );
};

export default BrowsePage;
