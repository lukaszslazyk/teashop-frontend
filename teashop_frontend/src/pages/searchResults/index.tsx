import React from "react";
import ProductsBrowser from "../../domain/product/components/ProductsBrowser";
import NotFoundPage from "../notFound";
import SearchResultsPageHeader from "./components/SearchResultsPageHeader";
import useLogic from "./logic";

const PRODUCTS_PAGE_SIZE = 12;

const SearchResultsPage = () => {
    const {
        searchPhrase,
        handlePaginationChange,
        searchPhraseValid,
        getErrorMessage,
    } = useLogic(PRODUCTS_PAGE_SIZE);

    if (searchPhraseValid())
        return <NotFoundPage />;

    return (
        <ProductsBrowser
            productsPageSize={PRODUCTS_PAGE_SIZE}
            errorMessage={getErrorMessage()}
            onPaginationChange={handlePaginationChange}
            headerComponent={
                <SearchResultsPageHeader
                    searchPhrase={searchPhrase ? searchPhrase : ""}
                />
            }
        />
    );
};

export default SearchResultsPage;
