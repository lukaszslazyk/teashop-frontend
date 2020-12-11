export interface BrowsePageParams {
    categoryName: string | undefined;
}

export interface ProductDetailsPageParams {
    productId: string;
}

export interface OrderDetailsPageParams {
    orderNo: string;
}

const routing = {
    home: "/",
    browse: {
        pathPattern: "/browse/:categoryName?",
        getPathWithParams: (params: BrowsePageParams) =>
            `/browse/${params.categoryName}`,
    },
    browseGreenTea: "/browse/GreenTea",
    browseBlackTea: "/browse/BlackTea",
    browseRedTea: "/browse/RedTea",
    browseWhiteTea: "/browse/WhiteTea",
    browseHerbs: "/browse/Herbs",
    browseAccessories: "/browse/Accessories",
    productDetails: {
        pathPattern: "/products/:productId",
        getPathWithParams: (params: ProductDetailsPageParams) =>
            `/products/${params.productId}`,
    },
    cart: "/cart",
    checkout: "/checkout",
    orderDetails: {
        pathPattern: "/orders/:orderNo",
        getPathWithParams: (params: OrderDetailsPageParams) =>
            `/orders/${params.orderNo}`,
    },
};

export default routing;
