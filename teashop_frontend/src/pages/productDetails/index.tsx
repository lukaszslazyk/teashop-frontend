import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router";
import ErrorInfo from "../../shared/components/ErrorInfo";
import MainLayout from "../../layouts/main";
import { Product } from "../../domain/product/models";
import ProductDetailsContentHeader from "./components/ProductDetailsContentHeader";
import ProductDetailsContentBody from "./components/ProductDetailsContentBody";
import useStyles from "./styles";
import useAddItemToCartResponseNotifyEffect from "./hooks/useAddItemToCartResponseNotifyEffect";
import { CancelToken, createCancelToken } from "../../shared/utils/cancelToken";

interface Props {
    product: Product | null;
    productIsFetching: boolean;
    productErrorOccurred: boolean;
    cartIsSending: boolean;
    cartErrorOccurred: boolean;
    loadProduct: (productId: string, cancelToken: CancelToken) => void;
    addItemToSessionCart: (
        product: Product,
        quantity: number,
        cancelToken: CancelToken
    ) => void;
}

interface Params {
    productId: string;
}

const ProductDetailsPage = (props: Props) => {
    const classes = useStyles();
    const { productId }: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);
    useAddItemToCartResponseNotifyEffect(
        props.cartIsSending,
        props.cartErrorOccurred
    );

    const addItemToSessionCartCallback = () => {
        if (props.product)
            props.addItemToSessionCart(
                props.product,
                quantity,
                createCancelToken()
            );
    };

    const product = props.product;
    const productPricedByWeight = useCallback((): boolean => {
        if (product)
            return product.quantityPerPrice > 1;

        return false;
    }, [product]);

    const loadProduct = props.loadProduct;
    useEffect(() => {
        const cancelToken = createCancelToken();
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
            {!props.productIsFetching && !props.productErrorOccurred && (
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
