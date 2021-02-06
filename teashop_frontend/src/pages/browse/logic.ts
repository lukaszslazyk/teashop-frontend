import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { BrowsePageParams } from "../../configuration/routing";
import {
    clearProducts,
    fetchProductsInCategory,
} from "../../domain/product/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = (productsPageSize: number) => {
    const products = useSelector((state: RootState) => state.product.products);
    const chosenSortOptionName = useSelector(
        (state: RootState) => state.product.chosenSortOptionName
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const errorType = useSelector(
        (state: RootState) => state.product.errorType
    );
    const dispatch = useDispatch();
    const { categoryName } = useParams<BrowsePageParams>();

    const categoryNameValid = useCallback(
        (): boolean => categoryName !== undefined,
        [categoryName]
    );

    const categoryExists = () =>
        categoryNameValid() &&
        !(errorOccurred && errorType === ApiErrorType.InvalidResponse);

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (categoryName && categoryNameValid())
            dispatch(
                fetchProductsInCategory(
                    categoryName,
                    0,
                    productsPageSize,
                    cancelToken,
                    chosenSortOptionName
                )
            );
        return () => {
            cancelToken.cancel();
            dispatch(clearProducts());
        };
    }, [
        categoryName,
        productsPageSize,
        chosenSortOptionName,
        categoryNameValid,
        dispatch,
    ]);

    const handlePaginationChange = (pageNumber: number) => {
        if (categoryName)
            dispatch(
                fetchProductsInCategory(
                    categoryName,
                    pageNumber - 1,
                    productsPageSize,
                    createRequestCancelToken(),
                    chosenSortOptionName
                )
            );
    };

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
        handlePaginationChange,
        categoryExists,
        categoryIsEmpty,
        getErrorMessage,
    };
};

export default useLogic;
