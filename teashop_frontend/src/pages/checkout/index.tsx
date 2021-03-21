import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingIndicator from "../../shared/components/PageLoadingIndicator";
import CheckoutMainView from "./components/CheckoutMainView";
import useLogic from "./logic";

const CheckoutPage = () => {
    const {
        pageInitialized,
        orderMetaIsFetching,
        orderMetaErrorOccurred,
        getErrorMessage,
    } = useLogic();

    if (!pageInitialized)
        return null;

    return (
        <div>
            {orderMetaIsFetching && <PageLoadingIndicator />}
            {!orderMetaIsFetching && orderMetaErrorOccurred && (
                <ErrorInfo errorMessage={getErrorMessage()} />
            )}
            {!orderMetaIsFetching && !orderMetaErrorOccurred && (
                <CheckoutMainView />
            )}
        </div>
    );
};

export default CheckoutPage;
