import { Grid, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import ProductSortOptionSelect from "../../domain/product/components/ProductSortOptionSelect";
import NotFoundPage from "../notFound";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const BrowsePage = () => {
    const logic = useLogic(PRODUCTS_PAGE_SIZE);
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

    if (!logic.categoryExists())
        return <NotFoundPage />;

    return (
        <Grid container spacing={2}>
            <Grid
                item
                xs={12}
                container
                justify={isXsScreen ? "flex-start" : "flex-end"}
            >
                <ProductSortOptionSelect />
            </Grid>
            <Grid item xs={12}>
                <ProductsBrowser
                    productsPageSize={PRODUCTS_PAGE_SIZE}
                    customErrorOcurred={logic.categoryIsEmpty()}
                    errorMessage={logic.getErrorMessage()}
                    onPaginationChange={logic.handlePaginationChange}
                />
            </Grid>
        </Grid>
    );
};

export default BrowsePage;
