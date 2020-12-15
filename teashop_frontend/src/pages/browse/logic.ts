import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { BrowsePageParams } from "../../configuration/routing";
import { fetchProductsInCategory } from "../../domain/product/actions";
import { availableProductCategories } from "../../domain/product/models";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const products = useSelector((state: RootState) => state.product.products);
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const errorType = useSelector(
        (state: RootState) => state.product.errorType
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

    const anyErrors = () =>
        errorOccurred || categoryIsEmpty();

    const categoryIsEmpty = (): boolean => products.length === 0;

    const getErrorMessage = (): string => {
        if (errorOccurred) {
            if (errorType === ApiErrorType.Timeout)
                return "Products in this category are currently unavailable.\nPlease try again later.";
            else if (errorType === ApiErrorType.Unexpected)
                return "We've encountered some issues on our servers.\nPlease try again later.";
        } else if (categoryIsEmpty())
            return "There are no products in this category.";
        return "";
    };

    return {
        products,
        productsAreFetching,
        categoryIsAvailable,
        anyErrors,
        getErrorMessage,
    };
};

export default useLogic;
