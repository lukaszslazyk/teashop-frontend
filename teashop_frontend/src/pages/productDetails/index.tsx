import { Container, Grid } from "@material-ui/core";
import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import ProductDetailsContentBody from "./components/ProductDetailsContentBody";
import ProductDetailsContentHeader from "./components/ProductDetailsContentHeader";
import useLogic from "./logic";

const ProductDetailsPage = () => {
    const logic = useLogic();
    const { product, productIsFetching, errorOccurred } = logic;

    return (
        <Container maxWidth="md" disableGutters>
            {productIsFetching && <PageLoadingProgress />}
            {!productIsFetching && errorOccurred && (
                <ErrorInfo errorMessage={logic.getErrorMessage()} />
            )}
            {!productIsFetching && !errorOccurred && product && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProductDetailsContentHeader product={product} />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductDetailsContentBody product={product} />
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default ProductDetailsPage;
