import { useMediaQuery, useTheme } from "@material-ui/core";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { BrowsePageParams } from "../../configuration/routing";
import { fetchProductsInCategory } from "../../domain/product/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = (productsPageSize: number) => {
    const products = useSelector((state: RootState) => state.product.products);
    const pagesInTotal = useSelector(
        (state: RootState) => state.product.pagesInTotal
    );
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
    const location = useLocation();
    const { categoryName } = useParams<BrowsePageParams>();
    const [pageNumber, setPageNumber] = useState(1);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const categoryExists = useCallback(
        (): boolean =>
            categoryName !== undefined &&
            !(errorOccurred && errorType === ApiErrorType.InvalidResponse),
        [categoryName, errorOccurred, errorType]
    );

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (categoryName)
            dispatch(
                fetchProductsInCategory(
                    categoryName,
                    0,
                    productsPageSize,
                    cancelToken
                )
            );
        return () => cancelToken.cancel();
    }, [categoryName, productsPageSize, dispatch]);

    useEffect(() => {
        setPageNumber(1);
    }, [location]);

    const handlePaginationChange = (
        event: ChangeEvent<unknown>,
        page: number
    ) => {
        if (categoryName) {
            setPageNumber(page);
            window.scrollTo({
                top: 0,
            });
            dispatch(
                fetchProductsInCategory(
                    categoryName,
                    page - 1,
                    productsPageSize,
                    createRequestCancelToken()
                )
            );
        }
    };

    const anyErrors = () => errorOccurred || categoryIsEmpty();

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
        pageNumber,
        pagesInTotal,
        productsAreFetching,
        isMobile,
        handlePaginationChange,
        categoryExists,
        anyErrors,
        getErrorMessage,
    };
};

export default useLogic;
