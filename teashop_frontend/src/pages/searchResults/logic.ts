import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import {
    clearProducts,
    fetchProductsWithSearchPhrase,
} from "../../domain/product/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = (productsPageSize: number) => {
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const chosenSortOptionName = useSelector(
        (state: RootState) => state.product.chosenSortOptionName
    );
    const resultsCount = useSelector(
        (state: RootState) => state.product.totalCount
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const errorType = useSelector(
        (state: RootState) => state.product.errorType
    );
    const dispatch = useDispatch();
    const location = useLocation();
    const searchPhrase = new URLSearchParams(location.search).get("phrase");

    const searchPhraseValid = useCallback(
        (): boolean =>
            searchPhrase === undefined ||
            searchPhrase === null ||
            searchPhrase.trim().length === 0,
        [searchPhrase]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (searchPhrase && !searchPhraseValid())
            dispatch(
                fetchProductsWithSearchPhrase(
                    searchPhrase,
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
        productsPageSize,
        searchPhrase,
        chosenSortOptionName,
        searchPhraseValid,
        dispatch,
    ]);

    const handlePaginationChange = (pageNumber: number) => {
        if (searchPhrase)
            dispatch(
                fetchProductsWithSearchPhrase(
                    searchPhrase,
                    pageNumber - 1,
                    productsPageSize,
                    createRequestCancelToken(),
                    chosenSortOptionName
                )
            );
    };

    const getErrorMessage = (): string => {
        if (errorOccurred)
            if (errorType === ApiErrorType.Timeout)
                return "Searching products is currently unavailable.\nPlease try again later.";
            else if (errorType === ApiErrorType.Unexpected)
                return "We've encountered some issues on our servers.\nPlease try again later.";

        return "";
    };

    return {
        searchPhrase,
        productsAreFetching,
        errorOccurred,
        resultsCount,
        handlePaginationChange,
        searchPhraseValid,
        getErrorMessage,
    };
};

export default useLogic;