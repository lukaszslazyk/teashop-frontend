import React from "react";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const BrowsePage = () => {
    const logic = useLogic();
    const { products, productsAreFetching, anyErrors } = logic;

    if (!logic.categoryIsAvailable())
        return <NotFoundPage />;

    return (
        <MainLayout>
            {productsAreFetching && <PageLoadingProgress />}
            {!productsAreFetching && anyErrors() && (
                <ErrorInfo errorMessage={logic.getErrorMessage()} />
            )}
            {!productsAreFetching && !anyErrors() && (
                <ProductCardTileGroup products={products} />
            )}
        </MainLayout>
    );
};

export default BrowsePage;
