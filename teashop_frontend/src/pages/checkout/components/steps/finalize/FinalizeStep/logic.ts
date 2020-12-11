import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { placeOrder } from "../../../../../../domain/order/actions";
import { createRequestCancelToken } from "../../../../../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const orderFormData = useSelector(
        (state: RootState) => state.order.orderFormData
    );
    const orderFormIsSending = useSelector(
        (state: RootState) => state.order.orderFormIsSending
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.order.orderFormErrorOccurred
    );
    const orderPlaced = useSelector(
        (state: RootState) => state.order.orderPlaced
    );
    const placedOrderId = useSelector(
        (state: RootState) => state.order.placedOrderId
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderPlaced)
            dispatch(placeOrder(orderFormData, cancelToken));
        return () => cancelToken.cancel();
    }, [orderFormData, orderPlaced, dispatch]);

    return {
        orderFormIsSending,
        errorOccurred,
        placedOrderId,
    };
};

export default useLogic;
