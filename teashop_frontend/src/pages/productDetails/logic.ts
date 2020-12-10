import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { ProductDetailsPageParams } from "../../configuration/routing";
import { fetchProductById } from "../../domain/product/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const product = useSelector((state: RootState) => state.product.product);
    const productIsFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();
    const { productId } = useParams<ProductDetailsPageParams>();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchProductById(productId, cancelToken));
        return () => cancelToken.cancel();
    }, [productId, dispatch]);

    return {
        product,
        productIsFetching,
        errorOccurred,
    };
};

export default useLogic;
