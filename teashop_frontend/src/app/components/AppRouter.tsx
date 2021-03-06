import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routing from "../../configuration/routing";
import Layout from "../../layout";
import BrowseCategoryPage from "../../pages/browseCategory";
import CartPage from "../../pages/cart";
import CheckoutPage from "../../pages/checkout";
import HomePage from "../../pages/home";
import NotFoundPage from "../../pages/notFound";
import OrderDetailsPage from "../../pages/orderDetails";
import ProductDetailsPage from "../../pages/productDetails";
import SearchResultsPage from "../../pages/searchResults";

const AppRouter = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route exact path={routing.home} component={HomePage} />
                <Route
                    exact
                    path={routing.browseCategory.pathPattern}
                    component={BrowseCategoryPage}
                />
                <Route
                    exact
                    path={routing.searchResults.pathPattern}
                    component={SearchResultsPage}
                />
                <Route
                    exact
                    path={routing.productDetails.pathPattern}
                    component={ProductDetailsPage}
                />
                <Route exact path={routing.cart} component={CartPage} />
                <Route exact path={routing.checkout} component={CheckoutPage} />
                <Route
                    exact
                    path={routing.orderDetails.pathPattern}
                    component={OrderDetailsPage}
                />
                <Route component={NotFoundPage} />
            </Switch>
        </Layout>
    </BrowserRouter>
);

export default AppRouter;
