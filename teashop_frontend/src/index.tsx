import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import configureStore from "./configuration/reduxSetup/configureStore";
import { unregister } from "./configuration/serviceWorker";
import { mainTheme } from "./configuration/themes";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={mainTheme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

unregister();
