import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { OrderDetailsPageParams } from "../../configuration/routing";
import { fetchOrder } from "../../domain/order/actions";
import { createRequestCancelToken } from "../../shared/services/requestCancelTokenService";

const useLogic = () => {
    const order = useSelector((state: RootState) => state.order.order);
    const orderIsFetching = useSelector(
        (state: RootState) => state.order.orderIsFetching
    );
    const errorOccurred = useSelector(
        (state: RootState) => state.order.orderErrorOccurred
    );
    const dispatch = useDispatch();
    const { orderId } = useParams<OrderDetailsPageParams>();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchOrder(orderId, cancelToken));
        return () => cancelToken.cancel();
    }, [orderId, dispatch]);

    return {
        order,
        orderId,
        orderIsFetching,
        errorOccurred,
    };
};

export default useLogic;
