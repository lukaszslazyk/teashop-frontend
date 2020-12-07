import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { placeOrder } from "../../../../domain/order/actions";
import { OrderFormData } from "../../../../domain/order/models";
import { RequestCancelToken } from "../../../../shared/services/requestCancelTokenService";
import PlaceOrderView from ".";

const mapStateToProps = (state: RootState) => ({
    orderFormData: state.order.orderFormData,
    isSending: state.order.orderFormIsSending,
    errorOccurred: state.order.orderFormErrorOccurred,
    orderPlaced: state.order.orderPlaced,
    placedOrderId: state.order.placedOrderId,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    placeOrder: (orderFormData: OrderFormData, cancelToken: RequestCancelToken) =>
        dispatch(placeOrder(orderFormData, cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderView);
