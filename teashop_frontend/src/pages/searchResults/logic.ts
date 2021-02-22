import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { SearchResultsPageQueryParamKeys } from "../../configuration/routing";
import {
    clearProducts,
    fetchProductsWithSearchPhrase,
} from "../../domain/product/actions";
import useQueryParams from "../../shared/hooks/useQueryParams";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = (productsPageSize: number) => {
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
    const queryParams = useQueryParams();
    const searchPhrase = queryParams.get(SearchResultsPageQueryParamKeys.Phrase);

    const searchPhraseValid = useCallback(
        (): boolean =>
            searchPhrase === null || searchPhrase.trim().length === 0,
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
        handlePaginationChange,
        searchPhraseValid,
        getErrorMessage,
    };
};

export default useLogic;
