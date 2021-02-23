import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import routing, {
    BrowseCategoryPagePathParams,
    BrowseCategoryPageQueryParamKeys,
} from "../../configuration/routing";
import { fetchProductsInCategory } from "../../domain/product/actions";
import { productsSortOptions } from "../../domain/product/models";
import { getDisplayNameFor } from "../../domain/product/services/productService";
import useQueryParams from "../../shared/hooks/useQueryParams";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const pageIsValid = (page: string | null) =>
    page === null || (!isNaN(Number(page)) && Number(page) > 0);

const orderByIsValid = (orderBy: string | null) =>
    orderBy === null || !isKnownSortOptionName(orderBy);

const isKnownSortOptionName = (sortOptionName: string) =>
    productsSortOptions.find(o => o.displayName === sortOptionName) !==
    undefined;

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
    const history = useHistory();
    const queryParams = useQueryParams();
    const { categoryName } = useParams<BrowseCategoryPagePathParams>();
    const page = queryParams.get(BrowseCategoryPageQueryParamKeys.Page);
    const orderBy = queryParams.get(BrowseCategoryPageQueryParamKeys.OrderBy);
    const pageIndex = page && pageIsValid(page) ? Number(page) - 1 : 0;
    const sortOptionName =
        orderBy && orderByIsValid(orderBy) ? orderBy : chosenSortOptionName;

    const paramsAreValid = useCallback(
        () => pageIsValid(page) && orderByIsValid(sortOptionName),
        [page, sortOptionName]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (paramsAreValid())
            dispatch(
                fetchProductsInCategory(
                    categoryName,
                    pageIndex,
                    productsPageSize,
                    cancelToken,
                    sortOptionName
                )
            );
        return () => cancelToken.cancel();
    }, [
        categoryName,
        pageIndex,
        productsPageSize,
        sortOptionName,
        paramsAreValid,
        dispatch,
    ]);

    const handlePaginationChange = (pageIndex: number) =>
        history.push(
            routing.browseCategory.getPathWithParams(
                { categoryName: categoryName },
                {
                    page: (pageIndex + 1).toString(),
                    orderBy: chosenSortOptionName,
                }
            )
        );

    const handleSortOptionChange = (sortOptionName: string) =>
        history.push(
            routing.browseCategory.getPathWithParams(
                { categoryName: categoryName },
                {
                    orderBy: sortOptionName,
                }
            )
        );

    const categoryExists = () =>
        !(errorOccurred && errorType === ApiErrorType.InvalidResponse);

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

    const categoryDisplayName = categoryName
        ? getDisplayNameFor(categoryName)
        : "";

    return {
        categoryDisplayName,
        pageIndex,
        handlePaginationChange,
        handleSortOptionChange,
        paramsAreValid,
        categoryExists,
        categoryIsEmpty,
        getErrorMessage,
    };
};

export default useLogic;
