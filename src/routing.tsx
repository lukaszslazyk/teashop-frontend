import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import BrowsePageContainer from "./pages/browse/container";
import HomePage from "./pages/home";
import NotFoundPage from "./pages/notFound";

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
                <Route component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routing;
