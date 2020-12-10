import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routing from "../../configuration/routing";
import BrowsePageContainer from "../../pages/browse/container";
import CartContainer from "../../pages/cart/container";
import CheckoutPageContainer from "../../pages/checkout/container";
import HomePage from "../../pages/home";
import NotFoundPage from "../../pages/notFound";
import OrderDetailsPageContainer from "../../pages/orderDetails/container";
import ProductDetailsPageContainer from "../../pages/productDetails/container";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={routing.home} component={HomePage} />
            <Route
                exact
                path={routing.browse.pathPattern}
                component={BrowsePageContainer}
            />
            <Route
                exact
                path={routing.productDetails.pathPattern}
                component={ProductDetailsPageContainer}
            />
            <Route exact path={routing.cart} component={CartContainer} />
            <Route
                exact
                path={routing.checkout}
                component={CheckoutPageContainer}
            />
            <Route
                exact
                path={routing.orderDetails.pathPattern}
                component={OrderDetailsPageContainer}
            />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default Router;
