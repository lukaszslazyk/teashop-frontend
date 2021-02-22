export interface BrowseCategoryPagePathParams {
    categoryName: string;
}

export interface ProductDetailsPagePathParams {
    productNumber: string;
}

export interface OrderDetailsPagePathParams {
    orderId: string;
}

export interface SearchResultsPageQueryParams {
    phrase: string;
}

export enum SearchResultsPageQueryParamKeys {
    Phrase = "phrase",
}

const routing = {
    home: "/",
    browseCategory: {
        pathPattern: "/browse/:categoryName",
        getPathWithParams: (pathParams: BrowseCategoryPagePathParams) =>
            `/browse/${pathParams.categoryName}`,
    },
    browseGreenTea: "/browse/GreenTea",
    browseBlackTea: "/browse/BlackTea",
    browseRedTea: "/browse/RedTea",
    browseWhiteTea: "/browse/WhiteTea",
    browseHerbs: "/browse/Herbs",
    browseAccessories: "/browse/Accessories",
    searchResults: {
        pathPattern: "/search",
        getPathWithParams: (queryParams: SearchResultsPageQueryParams) =>
            `/search?${mapToQueryParamsURLPart(queryParams)}`,
    },
    productDetails: {
        pathPattern: "/products/:productNumber",
        getPathWithParams: (pathParams: ProductDetailsPagePathParams) =>
            `/products/${pathParams.productNumber}`,
    },
    cart: "/cart",
    checkout: "/checkout",
    orderDetails: {
        pathPattern: "/orders/:orderId",
        getPathWithParams: (pathParams: OrderDetailsPagePathParams) =>
            `/orders/${pathParams.orderId}`,
    },
};

const mapToQueryParamsURLPart = (queryParams: any) => {
    const builder = new URLSearchParams();
    Object.keys(queryParams).map(key => builder.set(key, queryParams[key]));

    return builder.toString();
};

export default routing;
