import { SnackbarProvider } from "notistack";
import React from "react";
import AppRouter from "./components/AppRouter";
import useInitialOperations from "./initialOperations";
import useStyles from "./styles";

const App = () => {
    const classes = useStyles();

    useInitialOperations();

    return (
        <SnackbarProvider
            maxSnack={1}
            classes={{
                variantSuccess: classes.snackbar,
                variantError: classes.snackbar,
                containerAnchorOriginBottomCenter: classes.snackbarContainer,
            }}
        >
            <AppRouter />
        </SnackbarProvider>
    );
};

export default App;
