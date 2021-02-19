import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { ReactNode } from "react";
import ErrorInfo from "../../../../shared/components/ErrorInfo";
import ProductSortOptionSelect from "../ProductSortOptionSelect";
import ResponsiveProductCardGroup from "../ResponsiveProductCardGroup";
import useLogic from "./logic";
import useStyles from "./styles";

interface Props {
    productsPageSize: number;
    errorMessage: string;
    onPaginationChange: (pageNumber: number) => void;
    customErrorOcurred?: boolean;
    headerComponent?: ReactNode;
}

const ProductsBrowser = (props: Props) => {
    const {
        products,
        pagesInTotal,
        productsAreFetching,
        pageNumber,
        isXsScreen,
        anyErrors,
        shouldDisplaySuppliedHeader,
        shouldDisplaySortOptionSelect,
        shouldDisplayPagination,
        handlePaginationChange,
    } = useLogic(props.onPaginationChange, props.customErrorOcurred);
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid
                item
                xs={12}
                container
                className={classes.header}
                alignItems="center"
            >
                {shouldDisplaySuppliedHeader() && (
                    <Grid item className={classes.suppliedHeader}>
                        {props.headerComponent}
                    </Grid>
                )}
                {shouldDisplaySortOptionSelect() && (
                    <Grid item className={classes.sortOptionSelectContainer}>
                        <ProductSortOptionSelect
                            disabled={productsAreFetching}
                        />
                    </Grid>
                )}
            </Grid>
            {productsAreFetching && (
                <Grid item xs={12}>
                    <ResponsiveProductCardGroup
                        isPlaceholder
                        numberOfPlaceholderCards={props.productsPageSize}
                    />
                </Grid>
            )}
            {!productsAreFetching && anyErrors() && (
                <ErrorInfo errorMessage={props.errorMessage} />
            )}
            {!productsAreFetching && !anyErrors() && (
                <Grid item xs={12}>
                    <ResponsiveProductCardGroup products={products} />
                </Grid>
            )}
            {shouldDisplayPagination() && (
                <Grid item className={classes.paginationContainer}>
                    <Pagination
                        page={pageNumber}
                        count={pagesInTotal}
                        onChange={handlePaginationChange}
                        disabled={productsAreFetching}
                        color="primary"
                        size={isXsScreen ? "medium" : "large"}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default ProductsBrowser;
