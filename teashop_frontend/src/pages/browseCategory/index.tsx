import { Typography } from "@material-ui/core";
import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const BrowseCategoryPage = () => {
    const {
        categoryDisplayName,
        pageIndex,
        handlePaginationChange,
        handleSortOptionChange,
        paramsAreValid,
        categoryExists,
        categoryIsEmpty,
        getErrorMessage,
    } = useLogic(PRODUCTS_PAGE_SIZE);

    if (!paramsAreValid() || !categoryExists())
        return <NotFoundPage />;

    return (
        <ProductsBrowser
            pageIndex={pageIndex}
            productsPageSize={PRODUCTS_PAGE_SIZE}
            customErrorOcurred={categoryIsEmpty()}
            errorMessage={getErrorMessage()}
            onPaginationChange={handlePaginationChange}
            onSortOptionChange={handleSortOptionChange}
            headerComponent={
                <Typography variant="h4" color="primary">
                    {categoryDisplayName}
                </Typography>
            }
        />
    );
};

export default BrowseCategoryPage;
