import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import ProductCardTileGroupPlaceholder from "../../domain/product/components/ProductCardTileGroup/placeholder";
import ErrorInfo from "../../shared/components/ErrorInfo";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const BrowsePage = () => {
    const logic = useLogic(PRODUCTS_PAGE_SIZE);
    const {
        products,
        pageNumber,
        pagesInTotal,
        productsAreFetching,
        isMobile,
        anyErrors,
    } = logic;

    if (!logic.categoryExists())
        return <NotFoundPage />;

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
                {productsAreFetching && (
                    <ProductCardTileGroupPlaceholder
                        numberOfCards={PRODUCTS_PAGE_SIZE}
                    />
                )}
                {!productsAreFetching && anyErrors() && (
                    <ErrorInfo errorMessage={logic.getErrorMessage()} />
                )}
                {!productsAreFetching && !anyErrors() && (
                    <ProductCardTileGroup products={products} />
                )}
            </Grid>
            {products.length !== 0 && (
                <Grid item>
                    <Pagination
                        page={pageNumber}
                        count={pagesInTotal}
                        onChange={logic.handlePaginationChange}
                        disabled={productsAreFetching}
                        color="primary"
                        size={isMobile ? "medium" : "large"}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default BrowsePage;
