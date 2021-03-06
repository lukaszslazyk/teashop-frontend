import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import SearchResultsPageHeader from "./components/SearchResultsPageHeader";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const SearchResultsPage = () => {
    const {
        pageInitialized,
        searchPhrase,
        pageIndex,
        handlePaginationChange,
        handleSortOptionChange,
        paramsAreValid,
        getErrorMessage,
    } = useLogic(PRODUCTS_PAGE_SIZE);

    if (!pageInitialized)
        return null;

    if (!paramsAreValid())
        return <NotFoundPage />;

    return (
        <ProductsBrowser
            pageIndex={pageIndex}
            productsPageSize={PRODUCTS_PAGE_SIZE}
            errorMessage={getErrorMessage()}
            onPaginationChange={handlePaginationChange}
            onSortOptionChange={handleSortOptionChange}
            headerComponent={
                <SearchResultsPageHeader
                    searchPhrase={searchPhrase ? searchPhrase : ""}
                />
            }
        />
    );
};

export default SearchResultsPage;
