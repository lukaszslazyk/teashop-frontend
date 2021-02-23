import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import routing, {
    SearchResultsPageQueryParamKeys,
} from "../../configuration/routing";
import { fetchProductsWithSearchPhrase } from "../../domain/product/actions";
import { productsSortOptions } from "../../domain/product/models";
import useQueryParams from "../../shared/hooks/useQueryParams";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const searchPhraseValid = (searchPhrase: string | null) =>
    searchPhrase !== null && searchPhrase.trim().length !== 0;

const pageIsValid = (page: string | null) =>
    page === null || (!isNaN(Number(page)) && Number(page) > 0);

const orderByIsValid = (orderBy: string | null) =>
    orderBy === null || !isKnownSortOptionName(orderBy);

const isKnownSortOptionName = (sortOptionName: string) =>
    productsSortOptions.find(o => o.displayName === sortOptionName) !==
    undefined;

const getPageIndexFrom = (page: string | null) =>
    (page && pageIsValid(page) ? Number(page) - 1 : 0);

const getSortOptionNameFrom = (
    orderBy: string | null,
    chosenSortOptionName: string
) => (orderBy && orderByIsValid(orderBy) ? orderBy : chosenSortOptionName);

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
    const history = useHistory();
    const queryParams = useQueryParams();
    const searchPhrase = queryParams.get(
        SearchResultsPageQueryParamKeys.Phrase
    );
    const page = queryParams.get(SearchResultsPageQueryParamKeys.Page);
    const orderBy = queryParams.get(SearchResultsPageQueryParamKeys.OrderBy);
    const pageIndex = getPageIndexFrom(page);
    const sortOptionName = getSortOptionNameFrom(orderBy, chosenSortOptionName);

    const paramsAreValid = useCallback(
        () =>
            searchPhraseValid(searchPhrase) &&
            pageIsValid(page) &&
            orderByIsValid(sortOptionName),
        [searchPhrase, page, sortOptionName]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (searchPhrase && paramsAreValid())
            dispatch(
                fetchProductsWithSearchPhrase(
                    searchPhrase,
                    pageIndex,
                    productsPageSize,
                    cancelToken,
                    sortOptionName
                )
            );
        return () => cancelToken.cancel();
    }, [
        searchPhrase,
        pageIndex,
        productsPageSize,
        sortOptionName,
        paramsAreValid,
        dispatch,
    ]);

    const handlePaginationChange = (pageIndex: number) => {
        if (searchPhrase)
            history.push(
                routing.searchResults.getPathWithParams({
                    phrase: searchPhrase,
                    page: (pageIndex + 1).toString(),
                    orderBy: chosenSortOptionName,
                })
            );
    };

    const handleSortOptionChange = (sortOptionName: string) => {
        if (searchPhrase)
            history.push(
                routing.searchResults.getPathWithParams({
                    phrase: searchPhrase,
                    orderBy: sortOptionName,
                })
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
        pageIndex,
        handlePaginationChange,
        handleSortOptionChange,
        paramsAreValid,
        getErrorMessage,
    };
};

export default useLogic;
