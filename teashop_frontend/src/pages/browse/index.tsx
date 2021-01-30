import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import ProductCardLoadingPlaceholderTileGroup from "../../domain/product/components/ProductCardLoadingPlaceholderTileGroup";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import ErrorInfo from "../../shared/components/ErrorInfo";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const BrowsePage = () => {
    const logic = useLogic(PRODUCTS_PAGE_SIZE);
    const { products, pagesInTotal, productsAreFetching, anyErrors } = logic;

    if (!logic.categoryIsAvailable())
        return <NotFoundPage />;

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
                {productsAreFetching && (
                    <ProductCardLoadingPlaceholderTileGroup
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
                        count={pagesInTotal}
                        onChange={logic.handlePaginationChange}
                        disabled={productsAreFetching}
                        color="primary"
                        size="large"
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default BrowsePage;
