import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from "./configuration/serviceWorker";
import { ThemeProvider } from "@material-ui/core";
import { mainTheme } from "./layouts/main/themes";
import { Provider } from "react-redux";
import configureStore from "./configuration/reduxSetup/configureStore";
import { SnackbarProvider } from "notistack";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={mainTheme}>
                <SnackbarProvider maxSnack={1}>
                    <App />
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.unregister();
