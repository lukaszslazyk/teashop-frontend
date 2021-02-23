import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { fetchRecommendedProducts } from "../../../../domain/product/actions";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";

const useLogic = (
    numberOfProductsOnRegularScreen: number,
    numberOfProductsOnXsScreen: number
) => {
    const products = useSelector(
        (state: RootState) => state.product.recommendedProducts
    );
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();

    const numberOfProductsToFetch = useMemo(
        (): number =>
            (numberOfProductsOnRegularScreen > numberOfProductsOnXsScreen
                ? numberOfProductsOnRegularScreen
                : numberOfProductsOnXsScreen),
        [numberOfProductsOnRegularScreen, numberOfProductsOnXsScreen]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (products.length === 0)
            dispatch(
                fetchRecommendedProducts(numberOfProductsToFetch, cancelToken)
            );
        return () => cancelToken.cancel();
    }, [products, numberOfProductsToFetch, dispatch]);

    const anyErrors = () => errorOccurred || insufficientNumberOfProducts();

    const insufficientNumberOfProducts = (): boolean =>
        products.length < numberOfProductsToFetch;

    return {
        products,
        productsAreFetching,
        anyErrors,
    };
};

export default useLogic;
