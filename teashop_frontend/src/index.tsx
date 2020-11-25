import { ThemeProvider } from "@material-ui/core";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./app";
import configureStore from "./configuration/reduxSetup/configureStore";
import { unregister } from "./configuration/serviceWorker";
import { mainTheme } from "./layouts/main/themes";

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

unregister();