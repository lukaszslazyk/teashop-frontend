import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BrowsePageContainer from "../pages/browse/container";
import CartContainer from "../pages/cart/container";
import CheckoutPageContainer from "../pages/checkout/container";
import HomePage from "../pages/home";
import NotFoundPage from "../pages/notFound";
import OrderDetailsPageContainer from "../pages/orderDetails/container";
import ProductDetailsPageContainer from "../pages/productDetails/container";

const Routing = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
                exact
                path="/browse/:categoryName?"
                component={BrowsePageContainer}
            />
            <Route
                exact
                path="/product/:productId"
                component={ProductDetailsPageContainer}
            />
            <Route exact path="/cart" component={CartContainer} />
            <Route exact path="/checkout" component={CheckoutPageContainer} />
            <Route
                exact
                path="/orderDetails/:orderId"
                component={OrderDetailsPageContainer}
            />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default Routing;
