import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CheckoutMainView from "./components/CheckoutMainView";
import useLogic from "./logic";

const CheckoutPage = () => {
    const { dataIsFetching, anyErrors, noErrors, getErrorMessage } = useLogic();

    return (
        <div>
            {dataIsFetching() && <PageLoadingProgress />}
            {anyErrors() && <ErrorInfo errorMessage={getErrorMessage()} />}
            {noErrors() && <CheckoutMainView />}
        </div>
    );
};

export default CheckoutPage;
