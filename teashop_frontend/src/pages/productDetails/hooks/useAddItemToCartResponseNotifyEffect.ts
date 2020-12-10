import React, { useEffect } from "react";
import useStatusSnackbar from "../../../shared/hooks/useStatusSnackbar";

const useAddItemToCartResponseNotifyEffect = (
    requestIsProcessing: boolean,
    responseErrorOccurred: boolean
) => {
    const [waitingForResponse, setWaitingForResponse] = React.useState(false);
    const enqueueSuccessSnackbar = useStatusSnackbar("success");
    const enqueueErrorSnackbar = useStatusSnackbar("error");

    useEffect(() => {
        if (requestIsProcessing)
            setWaitingForResponse(true);
        else if (!requestIsProcessing && waitingForResponse) {
            if (responseErrorOccurred)
                enqueueErrorSnackbar(
                    "Error occurred while adding item to your cart. Please try again later."
                );
            else
                enqueueSuccessSnackbar("Item has been added to your cart.");
            setWaitingForResponse(false);
        }
    }, [
        requestIsProcessing,
        responseErrorOccurred,
        waitingForResponse,
        enqueueErrorSnackbar,
        enqueueSuccessSnackbar,
    ]);
};

export default useAddItemToCartResponseNotifyEffect;
