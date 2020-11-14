import { Dispatch } from "react";
import { connect } from "react-redux";
import { addItemToSessionCart } from "../../cart/actions";
import { fetchProductById } from "../../product/actions";
import { RootState } from "../../redux_setup/rootReducer";
import ProductDetailsPage from "./index";

const mapStateToProps = (state: RootState) => ({
    product: state.product.product,
    productIsFetching: state.product.isFetching,
    productErrorOccurred: state.product.errorOccurred,
    cartIsSending: state.cart.isSending,
    cartErrorOccurred: state.cart.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProduct: (productId: string) => dispatch(fetchProductById(productId)),
    addItemToSessionCart: (productId: string, quantity: number) =>
        dispatch(addItemToSessionCart(productId, quantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
