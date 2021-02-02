import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const BrowsePage = () => {
    const logic = useLogic(PRODUCTS_PAGE_SIZE);

    if (!logic.categoryExists())
        return <NotFoundPage />;

    return (
        <ProductsBrowser
            productsPageSize={PRODUCTS_PAGE_SIZE}
            customErrorOcurred={logic.categoryIsEmpty()}
            errorMessage={logic.getErrorMessage()}
            onPaginationChange={logic.handlePaginationChange}
        />
    );
};

export default BrowsePage;
