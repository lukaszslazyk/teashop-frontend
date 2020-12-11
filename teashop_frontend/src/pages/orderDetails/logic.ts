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
    const { orderNo } = useParams<OrderDetailsPageParams>();

    useEffect(() => {
        const cancelToken = createRequestCancelToken();
        dispatch(fetchOrder(orderNo, cancelToken));
        return () => cancelToken.cancel();
    }, [orderNo, dispatch]);

    return {
        order,
        orderIsFetching,
        errorOccurred,
    };
};

export default useLogic;
