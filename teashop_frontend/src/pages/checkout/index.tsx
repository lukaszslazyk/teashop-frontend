import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import PageLoadingProgress from "../../shared/components/LoadingProgress";
import CheckoutMainView from "./components/CheckoutMainView";
import useLogic from "./logic";

const CheckoutPage = () => {
    const {
        orderMetaIsFetching,
        orderMetaErrorOccurred,
        getErrorMessage,
    } = useLogic();

    return (
        <div>
            {orderMetaIsFetching && <PageLoadingProgress />}
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
