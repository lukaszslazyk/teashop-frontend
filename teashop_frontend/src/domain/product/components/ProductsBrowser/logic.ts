import { useMediaQuery, useTheme } from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";

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
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    useEffect(() => {
        setPageNumber(1);
    }, [location, chosenSortOptionName]);

    const handlePaginationChange = (
        _event: ChangeEvent<unknown>,
        page: number
    ) => {
        setPageNumber(page);
        window.scrollTo({
            top: 0,
        });
        onPaginationChange(page);
    };

    const anyErrors = () => errorOccurred && customErrorOcurred;

    const shouldDisplaySuppliedHeader = () =>
        productsAreFetching || (!productsAreFetching && !anyErrors());

    return {
        products,
        pagesInTotal,
        productsAreFetching,
        pageNumber,
        isMobile,
        anyErrors,
        shouldDisplaySuppliedHeader,
        handlePaginationChange,
    };
};

export default useLogic;
