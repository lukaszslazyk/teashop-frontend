import { useMediaQuery, useTheme } from "@material-ui/core";
import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";

const scrollToTop = () =>
    window.scrollTo({
        top: 0,
    });

const useLogic = (
    onPaginationChange: (pageIndex: number) => void,
    customErrorOcurred?: boolean
) => {
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
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => scrollToTop(), []);

    useEffect(() => {
        if (productsAreFetching)
            scrollToTop();
    }, [productsAreFetching]);

    const handlePaginationChange = (
        _event: ChangeEvent<unknown>,
        page: number
    ) => onPaginationChange(page - 1);

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
        isXsScreen,
        anyErrors,
        shouldDisplaySuppliedHeader,
        shouldDisplaySortOptionSelect,
        shouldDisplayPagination,
        handlePaginationChange,
    };
};

export default useLogic;
