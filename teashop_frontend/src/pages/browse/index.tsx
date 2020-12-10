import React from "react";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const BrowsePage = () => {
    const logic = useLogic();
    const { products, productsAreFetching, errorOccurred } = logic;

    if (!logic.categoryIsAvailable())
        return <NotFoundPage />;

    return (
        <MainLayout>
            {productsAreFetching && <PageLoadingProgress />}
            {!productsAreFetching &&
                (errorOccurred || products.length === 0) && (
                <ErrorInfo errorMessage="No product in this category is currently available." />
            )}
            {!productsAreFetching && !errorOccurred && products.length > 0 && (
                <ProductCardTileGroup products={products} />
            )}
        </MainLayout>
    );
};

export default BrowsePage;
