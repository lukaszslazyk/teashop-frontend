import { useMediaQuery, useTheme } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";

const scrollToTop = () =>
    window.scrollTo({
        top: 0,
    });

const useLogic = (
    onPaginationChange: (pageNumber: number) => void,
    customErrorOcurred?: boolean
) => {
    const products = useSelector((state: RootState) => state.product.products);
    const chosenSortOptionName = useSelector(
        (state: RootState) => state.product.chosenSortOptionName
    );
    const pagesInTotal = useSelector(
        (state: RootState) => state.product.pagesInTotal
    );
    const productsAreFetching = useSelector(
        (state: RootState) => state.product.isFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.product.errorOccurred
    );
    const location = useLocation();
    const [pageNumber, setPageNumber] = useState(1);
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => {
        setPageNumber(1);
    }, [location, chosenSortOptionName]);

    const handlePaginationChange = (
        _event: ChangeEvent<unknown>,
        page: number
    ) => {
        setPageNumber(page);
        scrollToTop();
        onPaginationChange(page);
    };

    const anyErrors = () => errorOccurred || customErrorOcurred;

    const shouldDisplaySuppliedHeader = () =>
        productsAreFetching || (!productsAreFetching && !anyErrors());

    const shouldDisplaySortOptionSelect = () =>
        productsAreFetching || (!anyErrors() && products.length !== 0);

    const shouldDisplayPagination = () => !anyErrors() && products.length !== 0;

    return {
        products,
        pagesInTotal,
        productsAreFetching,
        pageNumber,
        isXsScreen,
        anyErrors,
        shouldDisplaySuppliedHeader,
        shouldDisplaySortOptionSelect,
        shouldDisplayPagination,
        handlePaginationChange,
    };
};

export default useLogic;
