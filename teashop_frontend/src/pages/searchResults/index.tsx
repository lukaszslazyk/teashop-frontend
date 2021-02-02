import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import SearchResultsPageHeader from "./components/SearchResultsPageHeader";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const SearchResultsPage = () => {
    const logic = useLogic(PRODUCTS_PAGE_SIZE);
    const {
        searchPhrase,
        productsAreFetching,
        errorOccurred,
        resultsCount,
    } = logic;

    if (logic.searchPhraseEmpty())
        return <NotFoundPage />;

    return (
        <div>
            {productsAreFetching && (
                <SearchResultsPageHeader
                    searchPhrase={searchPhrase ? searchPhrase : ""}
                    resultsCount={0}
                    resultsAreLoading
                />
            )}
            {!productsAreFetching && !errorOccurred && (
                <SearchResultsPageHeader
                    searchPhrase={searchPhrase ? searchPhrase : ""}
                    resultsCount={resultsCount}
                    resultsAreLoading={false}
                />
            )}
            <ProductsBrowser
                productsPageSize={PRODUCTS_PAGE_SIZE}
                errorMessage={logic.getErrorMessage()}
                onPaginationChange={logic.handlePaginationChange}
            />
        </div>
    );
};

export default SearchResultsPage;
