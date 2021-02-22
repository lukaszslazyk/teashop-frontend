import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { ProductDetailsPageParams } from "../../configuration/routing";
import { fetchProductByProductNumber } from "../../domain/product/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const product = useSelector((state: RootState) => state.product.product);
    const productIsFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const errorType = useSelector(
        (state: RootState) => state.product.errorType
    );
    const dispatch = useDispatch();
    const { productNumber } = useParams<ProductDetailsPageParams>();

    const shouldFetchProduct = useCallback(
        () => !product || productNumber !== product.productNumber.toString(),
        [product, productNumber]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (shouldFetchProduct())
            dispatch(fetchProductByProductNumber(productNumber, cancelToken));
        return () => cancelToken.cancel();
    }, [productNumber, shouldFetchProduct, dispatch]);

    const getErrorMessage = (): string => {
        if (errorType === ApiErrorType.NotFound)
            return "Product does not exist.";
        else if (errorType === ApiErrorType.Timeout)
            return "Product is currently unavailable.\nPlease try again later.";
        else if (errorType === ApiErrorType.Unexpected)
            return "We've encountered some issues on our servers.\nPlease try again later.";
        return "";
    };

    return {
        product,
        productIsFetching,
        errorOccurred,
        getErrorMessage,
    };
};

export default useLogic;
