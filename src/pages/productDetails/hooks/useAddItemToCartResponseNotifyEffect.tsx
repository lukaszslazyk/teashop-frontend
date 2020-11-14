import React, { useEffect } from "react";
import useStatusSnackbar from "../../../common/hooks/useStatusSnackbar";

const useAddItemToCartResponseNotifyEffect = (
    requestIsProcessing: boolean,
    responseErrorOccurred: boolean
) => {
    const [awaitingResponse, setAwaitingResponse] = React.useState(false);
    const enqueueSuccessSnackbar = useStatusSnackbar("success");
    const enqueueErrorSnackbar = useStatusSnackbar("error");

    useEffect(() => {
        if (requestIsProcessing) {
            setAwaitingResponse(true);
        } else if (awaitingResponse) {
            if (responseErrorOccurred)
                enqueueErrorSnackbar(
                    "Error occurred while adding item to your cart. Please try again later."
                );
            else
                enqueueSuccessSnackbar("Item has been added to your cart.");
            setAwaitingResponse(false);
        }
    }, [
        requestIsProcessing,
        responseErrorOccurred,
        awaitingResponse,
        enqueueErrorSnackbar,
        enqueueSuccessSnackbar,
    ]);
};

export default useAddItemToCartResponseNotifyEffect;
