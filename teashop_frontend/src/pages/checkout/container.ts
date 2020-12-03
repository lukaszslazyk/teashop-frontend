import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { fetchOrderMeta } from "../../domain/order/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import CheckoutPage from ".";

const mapStateToProps = (state: RootState) => ({
    orderMetaIsFetching: state.order.orderMetaIsFetching,
    orderMetaErrorOccurred: state.order.orderMetaErrorOccurred,
    cart: state.cart.cart,
    cartFetchedOnInit: state.cart.fetchedYet,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchOrderMeta: (cancelToken: RequestCancelToken) =>
        dispatch(fetchOrderMeta(cancelToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
