import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../configuration/reduxSetup/rootReducer";
import { fetchOrderMeta, setCartPrice } from "../../domain/order/actions";
import { RequestCancelToken } from "../../shared/services/requestCancelTokenService";
import CheckoutPage from ".";

const mapStateToProps = (state: RootState) => ({
    orderMetaIsFetching: state.order.orderMetaIsFetching,
    orderMetaErrorOccurred: state.order.orderMetaErrorOccurred,
    cart: state.cart.cart,
    cartFetchedYet: state.cart.fetchedYet,
    cartErrorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    fetchOrderMeta: (cancelToken: RequestCancelToken) =>
        dispatch(fetchOrderMeta(cancelToken)),
    setCartPrice: (value: number) => dispatch(setCartPrice(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);
