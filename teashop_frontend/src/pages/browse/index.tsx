import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import {
    Product,
    availableProductCategories,
} from "../../domain/product/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import {
    RequestCancelToken,
    createRequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import NotFoundPage from "../notFound";
import useStyles from "./styles";

interface Props {
    products: Product[];
    isFetching: boolean;
    errorOccurred: boolean;
    loadProductsInCategory: (
        categoryName: string,
        cancelToken: RequestCancelToken
    ) => void;
}

interface Params {
    categoryName: string | undefined;
}

const BrowsePage = (props: Props) => {
    const classes = useStyles();
    const { categoryName }: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);
    const { loadProductsInCategory } = props;

    const categoryIsAvailable = useCallback((): boolean =>
        categoryName !== undefined &&
        availableProductCategories.includes(categoryName),
    [categoryName]);

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        setTimeoutPassed(false);
        if (categoryName && categoryIsAvailable())
            loadProductsInCategory(categoryName, cancelToken);
        return () => cancelToken.cancel();
    }, [categoryName, categoryIsAvailable, loadProductsInCategory]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeoutPassed]);

    if (!categoryIsAvailable())
        return <NotFoundPage />;

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
