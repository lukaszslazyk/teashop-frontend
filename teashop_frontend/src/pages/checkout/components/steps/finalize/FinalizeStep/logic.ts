import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../../../configuration/routing";
import {
    closeCheckout,
    placeOrder,
} from "../../../../../../domain/order/actions";
import { createRequestCancelToken } from "../../../../../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const orderFormData = useSelector(
        (state: RootState) => state.order.orderFormData
    );
    const orderLines = useSelector(
        (state: RootState) => state.order.orderLines
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
    const placedOrderNumber = useSelector(
        (state: RootState) => state.order.placedOrderNumber
    );
    const dispatch = useDispatch();
    const [requestWasSent, setRequestWasSent] = useState(false);
    const orderDetailsRoutePath = routing.orderDetails.getPathWithParams({
        orderId: placedOrderId,
    });

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderPlaced) {
            dispatch(placeOrder(orderFormData, orderLines, cancelToken));
            setRequestWasSent(true);
        }
        return () => cancelToken.cancel();
    }, [orderFormData, orderLines, orderPlaced, dispatch]);

    useEffect(
        () => () => {
            setRequestWasSent(false);
            dispatch(closeCheckout());
        },
        [dispatch]
    );

    return {
        requestWasSent,
        orderFormIsSending,
        errorOccurred,
        placedOrderNumber,
        orderDetailsRoutePath,
    };
};

export default useLogic;
