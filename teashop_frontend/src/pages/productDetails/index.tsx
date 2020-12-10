import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { ProductDetailsPageParams } from "../../configuration/routing";
import { fetchProductById } from "../../domain/product/actions";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import ProductDetailsContentBody from "./components/ProductDetailsContentBody";
import ProductDetailsContentHeader from "./components/ProductDetailsContentHeader";

const ProductDetailsPage = () => {
    const product = useSelector((state: RootState) => state.product.product);
    const productIsFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const productErrorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();
    const { productId } = useParams<ProductDetailsPageParams>();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchProductById(productId, cancelToken));
        return () => cancelToken.cancel();
    }, [productId, dispatch]);

    return (
        <MainLayout>
            {productIsFetching && <PageLoadingProgress />}
            {!productIsFetching && productErrorOccurred && (
                <ErrorInfo errorMessage="Product is currently unavailable." />
            )}
            {!productIsFetching && !productErrorOccurred && product && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProductDetailsContentHeader product={product} />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductDetailsContentBody product={product} />
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default ProductDetailsPage;
