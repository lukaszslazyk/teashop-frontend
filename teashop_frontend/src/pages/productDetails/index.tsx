import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Product } from "../../domain/product/models";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import ProductDetailsContentBody from "./components/ProductDetailsContentBody";
import ProductDetailsContentHeader from "./components/ProductDetailsContentHeader";

interface Props {
    product: Product | null;
    productIsFetching: boolean;
    productErrorOccurred: boolean;
    cartIsSending: boolean;
    cartErrorOccurred: boolean;
    loadProduct: (productId: string, cancelToken: RequestCancelToken) => void;
    addItemToSessionCart: (
        product: Product,
        quantity: number,
        cancelToken: RequestCancelToken
    ) => void;
}

interface Params {
    productId: string;
}

const ProductDetailsPage = (props: Props) => {
    const { productId } = useParams<Params>();
    const { loadProduct } = props;

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        loadProduct(productId, cancelToken);
        return () => cancelToken.cancel();
    }, [productId, loadProduct]);

    return (
        <MainLayout>
            {props.productIsFetching && (
                <PageLoadingProgress />
            )}
            {!props.productIsFetching && props.productErrorOccurred && (
                <ErrorInfo errorMessage="Product is currently unavailable." />
            )}
            {!props.productIsFetching &&
                !props.productErrorOccurred &&
                props.product && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProductDetailsContentHeader
                            product={props.product}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductDetailsContentBody
                            product={props.product}
                        />
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default ProductDetailsPage;
