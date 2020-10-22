import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BrowsePageContainer from "./pages/browse/container";
import HomePage from "./pages/home";

const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/browse" component={BrowsePageContainer} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
