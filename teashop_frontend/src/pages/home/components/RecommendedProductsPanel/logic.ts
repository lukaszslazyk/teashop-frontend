import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    clearProducts,
    fetchProductsInCategory,
} from "../../../../domain/product/actions";
import { createRequestCancelToken } from "../../../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const products = useSelector((state: RootState) => state.product.products);
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchProductsInCategory("Recommended", 0, 5, cancelToken));
        return () => {
            cancelToken.cancel();
            dispatch(clearProducts());
        };
    }, [dispatch]);

    const anyErrors = () => errorOccurred || insufficientNumberOfProducts();

    const insufficientNumberOfProducts = (): boolean => products.length < 5;

    return {
        products,
        productsAreFetching,
        anyErrors,
    };
};

export default useLogic;
