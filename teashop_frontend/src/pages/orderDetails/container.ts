import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { fetchOrder } from "../../domain/order/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import OrderDetailsPage from "./index";

const mapStateToProps = (state: RootState) => ({
    order: state.order.order,
    isFetching: state.order.orderIsFetching,
    errorOccurred: state.order.orderErrorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchOrder: (orderId: string, cancelToken: RequestCancelToken) =>
        dispatch(fetchOrder(orderId, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsPage);
