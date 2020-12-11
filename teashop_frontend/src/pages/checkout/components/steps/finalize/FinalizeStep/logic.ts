import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import routing from "../../../../../../configuration/routing";
import { placeOrder, resetOrderPlaced } from "../../../../../../domain/order/actions";
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
    const placedOrderNo = useSelector(
        (state: RootState) => state.order.placedOrderNo
    );
    const dispatch = useDispatch();
    const [requestWasSent, setRequestWasSent] = useState(false);
    const orderDetailsRoutePath = routing.orderDetails.getPathWithParams({
        orderNo: placedOrderNo.toString(),
    });
    
    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        if (!orderPlaced) {
            dispatch(placeOrder(orderFormData, cancelToken));
            setRequestWasSent(true);
        }
        return () => cancelToken.cancel();
    }, [orderFormData, orderPlaced, dispatch]);

    useEffect(() => () => {
        setRequestWasSent(false);
        dispatch(resetOrderPlaced());
    }, [dispatch]);

    return {
        requestWasSent,
        orderFormIsSending,
        errorOccurred,
        placedOrderNo,
        orderDetailsRoutePath,
    };
};

export default useLogic;
