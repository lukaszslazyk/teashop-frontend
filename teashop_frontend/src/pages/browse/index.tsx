import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import { BrowsePageParams } from "../../configuration/routing";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import {
    Product,
    availableProductCategories,
} from "../../domain/product/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import {
    RequestCancelToken,
    createRequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import NotFoundPage from "../notFound";

interface Props {
    products: Product[];
    isFetching: boolean;
    errorOccurred: boolean;
    loadProductsInCategory: (
        categoryName: string,
        cancelToken: RequestCancelToken
    ) => void;
}

const BrowsePage = (props: Props) => {
    const { categoryName } = useParams<BrowsePageParams>();
    const { loadProductsInCategory } = props;

    const categoryIsAvailable = useCallback((): boolean =>
        categoryName !== undefined &&
        availableProductCategories.includes(categoryName),
    [categoryName]);

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (categoryName && categoryIsAvailable())
            loadProductsInCategory(categoryName, cancelToken);
        return () => cancelToken.cancel();
    }, [categoryName, categoryIsAvailable, loadProductsInCategory]);

    if (!categoryIsAvailable())
        return <NotFoundPage />;

    return (
        <MainLayout>
            {props.isFetching && (
                <PageLoadingProgress />
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
