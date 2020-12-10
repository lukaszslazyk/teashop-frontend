import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { BrowsePageParams } from "../../configuration/routing";
import { fetchProductsInCategory } from "../../domain/product/actions";
import { availableProductCategories } from "../../domain/product/models";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const products = useSelector((state: RootState) => state.product.products);
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const dispatch = useDispatch();
    const { categoryName } = useParams<BrowsePageParams>();

    const categoryIsAvailable = useCallback(
        (): boolean =>
            categoryName !== undefined &&
            availableProductCategories.includes(categoryName),
        [categoryName]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (categoryName && categoryIsAvailable())
            dispatch(fetchProductsInCategory(categoryName, cancelToken));
        return () => cancelToken.cancel();
    }, [categoryName, categoryIsAvailable, dispatch]);

    return {
        products,
        productsAreFetching,
        errorOccurred,
        categoryIsAvailable,
    };
};

export default useLogic;
