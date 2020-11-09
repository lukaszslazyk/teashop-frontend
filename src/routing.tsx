import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BrowsePageContainer from "./pages/browse/container";
import HomePage from "./pages/home";

const Routing = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route
                    exact
                    path={[
                        "/browse",
                        "/browse/GreenTea",
                        "/browse/BlackTea",
                        "/browse/RedTea",
                        "/browse/WhiteTea",
                        "/browse/Herbs",
                        "/browse/Accessories",
                    ]}
                    component={BrowsePageContainer}
                />
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
