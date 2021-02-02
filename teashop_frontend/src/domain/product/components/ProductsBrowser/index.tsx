import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import React from "react";
import ErrorInfo from "../../../../shared/components/ErrorInfo";
import ProductCardTileGroup from "../ProductCardTileGroup";
import ProductCardTileGroupPlaceholder from "../ProductCardTileGroup/placeholder";
import useLogic from "./logic";

interface Props {
    productsPageSize: number;
    errorMessage: string;
    onPaginationChange: (pageNumber: number) => void;
    customErrorOcurred?: boolean;
}

const ProductsBrowser = (props: Props) => {
    const logic = useLogic(props.onPaginationChange, props.customErrorOcurred);
    const {
        products,
        pagesInTotal,
        productsAreFetching,
        pageNumber,
        isMobile,
    } = logic;

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={12}>
                {productsAreFetching && (
                    <ProductCardTileGroupPlaceholder
                        numberOfCards={props.productsPageSize}
                    />
                )}
                {!productsAreFetching && logic.anyErrors() && (
                    <ErrorInfo errorMessage={props.errorMessage} />
                )}
                {!productsAreFetching && !logic.anyErrors() && (
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

export default ProductsBrowser;
