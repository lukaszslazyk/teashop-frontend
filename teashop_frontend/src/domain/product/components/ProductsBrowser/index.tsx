import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React, { ReactNode } from "react";
import ErrorInfo from "../../../../shared/components/ErrorInfo";
import ProductCardGroup from "../ProductCardGroup";
import ProductSortOptionSelect from "../ProductSortOptionSelect";
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
        isMobile,
        anyErrors,
        shouldDisplaySuppliedHeader,
        handlePaginationChange,
    } = useLogic(props.onPaginationChange, props.customErrorOcurred);
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid item xs={12} container className={classes.header}>
                {shouldDisplaySuppliedHeader() && (
                    <Grid item className={classes.suppliedHeader}>
                        {props.headerComponent}
                    </Grid>
                )}
                {!anyErrors() && (
                    <Grid item className={classes.sortOptionSelectContainer}>
                        <ProductSortOptionSelect
                            disabled={productsAreFetching}
                        />
                    </Grid>
                )}
            </Grid>
            {productsAreFetching && (
                <Grid item xs={12}>
                    <ProductCardGroup
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
                    <ProductCardGroup products={products} />
                </Grid>
            )}
            {!anyErrors() && products.length !== 0 && (
                <Grid item className={classes.paginationContainer}>
                    <Pagination
                        page={pageNumber}
                        count={pagesInTotal}
                        onChange={handlePaginationChange}
                        disabled={productsAreFetching}
                        color="primary"
                        size={isMobile ? "medium" : "large"}
                    />
                </Grid>
            )}
        </Grid>
    );
};

export default ProductsBrowser;
