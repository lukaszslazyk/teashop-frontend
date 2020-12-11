import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routing from "../../configuration/routing";
import BrowsePage from "../../pages/browse";
import CartPage from "../../pages/cart";
import CheckoutPage from "../../pages/checkout";
import HomePage from "../../pages/home";
import NotFoundPage from "../../pages/notFound";
import OrderDetailsPage from "../../pages/orderDetails";
import ProductDetailsPage from "../../pages/productDetails";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={routing.home} component={HomePage} />
            <Route
                exact
                path={routing.browse.pathPattern}
                component={BrowsePage}
            />
            <Route
                exact
                path={routing.productDetails.pathPattern}
                component={ProductDetailsPage}
            />
            <Route exact path={routing.cart} component={CartPage} />
            <Route
                exact
                path={routing.checkout}
                component={CheckoutPage}
            />
            <Route
                exact
                path={routing.orderDetails.pathPattern}
                component={OrderDetailsPage}
            />
            <Route component={NotFoundPage} />
        </Switch>
    </BrowserRouter>
);

export default Router;
