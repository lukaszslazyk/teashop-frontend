import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BrowsePageContainer from "./pages/browse/container";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/notFound";
import ProductDetailsPageContainer from "./pages/productDetails/container";

const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                    exact
                    path="/browse/:categoryName?"
                    component={BrowsePageContainer}
                />
                <Route
                    path="/product/:productId"
                    component={ProductDetailsPageContainer}
                />
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
