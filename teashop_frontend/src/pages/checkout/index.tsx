import React from "react";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CheckoutMainView from "./components/CheckoutMainView";
import useLogic from "./logic";

const CheckoutPage = () => {
    const logic = useLogic();

    return (
        <MainLayout>
            {logic.dataIsFetching() && <PageLoadingProgress />}
            {logic.anyErrors() && (
                <ErrorInfo errorMessage={logic.getErrorMessage()} />
            )}
            {logic.noErrors() && <CheckoutMainView />}
        </MainLayout>
    );
};

export default CheckoutPage;
