import React from "react";
import AppRouter from "./components/AppRouter";
import useInitialOperations from "./initialOperations";

const App = () => {
    useInitialOperations();

    return (
        <div>
            <AppRouter />
        </div>
    );
};

export default App;
