import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { BrowsePageParams } from "../../configuration/routing";
import { fetchProductsInCategory } from "../../domain/product/actions";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import { availableProductCategories } from "../../domain/product/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import NotFoundPage from "../notFound";

const BrowsePage = () => {
    const products = useSelector((state: RootState) => state.product.products);
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();
    const { categoryName } = useParams<BrowsePageParams>();

    const categoryIsAvailable = useCallback((): boolean =>
        categoryName !== undefined &&
            availableProductCategories.includes(categoryName),
    [categoryName]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (categoryName && categoryIsAvailable())
            dispatch(fetchProductsInCategory(categoryName, cancelToken));
        return () => cancelToken.cancel();
    }, [categoryName, categoryIsAvailable, dispatch]);

    if (!categoryIsAvailable())
        return <NotFoundPage />;

    return (
        <MainLayout>
            {productsAreFetching && <PageLoadingProgress />}
            {!productsAreFetching && (errorOccurred || products.length === 0) && (
                <ErrorInfo errorMessage="No product in this category is currently available." />
            )}
            {!productsAreFetching && !errorOccurred && products.length > 0 && (
                <ProductCardTileGroup products={products} />
            )}
        </MainLayout>
    );
};

export default BrowsePage;
