import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Product } from "../../domain/product/models";
import { pricedByWeight } from "../../domain/product/services/productService";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import {
    createRequestCancelToken,
    RequestCancelToken,
} from "../../shared/services/requestCancelTokenService";
import ProductDetailsContentBody from "./components/ProductDetailsContentBody";
import ProductDetailsContentHeader from "./components/ProductDetailsContentHeader";
import useAddItemToCartResponseNotifyEffect from "./hooks/useAddItemToCartResponseNotifyEffect";
import useStyles from "./styles";

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
    const classes = useStyles();
    const { productId }: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const { product, loadProduct } = props;
    useAddItemToCartResponseNotifyEffect(
        props.cartIsSending,
        props.cartErrorOccurred
    );

    const addItemToSessionCartCallback = () => {
        if (product)
            props.addItemToSessionCart(
                product,
                quantity,
                createRequestCancelToken()
            );
    };

    const productPricedByWeight = useCallback((): boolean =>
        product !== null && pricedByWeight(product),
    [product]);

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        setTimeoutPassed(false);
        loadProduct(productId, cancelToken);
        return () => cancelToken.cancel();
    }, [productId, loadProduct]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [setTimeoutPassed]);

    useEffect(() => {
        if (product)
            if (productPricedByWeight())
                setQuantity(100);
            else
                setQuantity(1);
    }, [product, setQuantity, productPricedByWeight]);

    return (
        <MainLayout>
            {props.productIsFetching && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {!props.productIsFetching && props.productErrorOccurred && (
                <ErrorInfo errorMessage="Product is currently unavailable." />
            )}
            {!props.productIsFetching && !props.productErrorOccurred && props.product && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProductDetailsContentHeader
                            product={props.product}
                            quantity={quantity}
                            isProcessing={props.cartIsSending}
                            quantityChangedCallback={setQuantity}
                            addItemToSessionCartCallback={
                                addItemToSessionCartCallback
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductDetailsContentBody product={props.product} />
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default ProductDetailsPage;
