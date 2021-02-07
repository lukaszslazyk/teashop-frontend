import { Box } from "@material-ui/core";
import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import SearchResultsPageHeader from "./components/SearchResultsPageHeader";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const SearchResultsPage = () => {
    const {
        searchPhrase,
        productsAreFetching,
        errorOccurred,
        resultsCount,
        handlePaginationChange,
        searchPhraseValid,
        getErrorMessage,
    } = useLogic(PRODUCTS_PAGE_SIZE);

    if (searchPhraseValid())
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
            <Box mt={2}>
                <ProductsBrowser
                    productsPageSize={PRODUCTS_PAGE_SIZE}
                    errorMessage={getErrorMessage()}
                    onPaginationChange={handlePaginationChange}
                />
            </Box>
        </div>
    );
};

export default SearchResultsPage;
