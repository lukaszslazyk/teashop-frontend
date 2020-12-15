import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { OrderDetailsPageParams } from "../../configuration/routing";
import { fetchOrder } from "../../domain/order/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";
import { ApiErrorType } from "../../shared/types";

const useLogic = () => {
    const order = useSelector((state: RootState) => state.order.order);
    const orderIsFetching = useSelector(
        (state: RootState) => state.order.orderIsFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.order.orderErrorOccurred
    );
    const errorType = useSelector(
        (state: RootState) => state.order.orderErrorType
    );
    const dispatch = useDispatch();
    const { orderNo } = useParams<OrderDetailsPageParams>();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchOrder(orderNo, cancelToken));
        return () => cancelToken.cancel();
    }, [orderNo, dispatch]);

    const getErrorMessage = (): string => {
        if (errorType === ApiErrorType.Timeout)
            return "Order is currently unavailable.\nPlease try again later.";
        else if (errorType === ApiErrorType.Unexpected)
            return "We've encountered some issues on our servers.\nPlease try again later.";
        return "";
    };

    return {
        order,
        orderIsFetching,
        errorOccurred,
        getErrorMessage,
    };
};

export default useLogic;
