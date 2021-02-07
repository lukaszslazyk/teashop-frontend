import { Typography } from "@material-ui/core";
import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const BrowsePage = () => {
    const {
        handlePaginationChange,
        categoryExists,
        categoryIsEmpty,
        getErrorMessage,
    } = useLogic(PRODUCTS_PAGE_SIZE);

    if (!categoryExists())
        return <NotFoundPage />;

    return (
        <ProductsBrowser
            productsPageSize={PRODUCTS_PAGE_SIZE}
            customErrorOcurred={categoryIsEmpty()}
            errorMessage={getErrorMessage()}
            onPaginationChange={handlePaginationChange}
            headerComponent={
                <Typography variant="h4" color="primary">
                    Browse
                </Typography>
            }
        />
    );
};

export default BrowsePage;
