import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    clearProducts,
    fetchProductsInCategory,
} from "../../../../domain/product/actions";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";

const recommendedCategoryName = "Recommended";

const useLogic = (
    numberOfProductsOnRegularScreen: number,
    numberOfProductsOnXsScreen: number
) => {
    const products = useSelector((state: RootState) => state.product.products);
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();

    const numberOfProductsToFetch = useMemo((): number => {
        if (numberOfProductsOnRegularScreen > numberOfProductsOnXsScreen)
            return numberOfProductsOnRegularScreen;
        return numberOfProductsOnXsScreen;
    }, [numberOfProductsOnRegularScreen, numberOfProductsOnXsScreen]);

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(
            fetchProductsInCategory(
                recommendedCategoryName,
                0,
                numberOfProductsToFetch,
                cancelToken
            )
        );
        return () => {
            cancelToken.cancel();
            dispatch(clearProducts());
        };
    }, [numberOfProductsToFetch, dispatch]);

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
