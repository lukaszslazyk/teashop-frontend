import { Dispatch } from "react";
import { connect } from "react-redux";
import { fetchProductById } from "../../product/actions";
import { RootState } from "../../redux_setup/rootReducer";
import ProductDetailsPage from "./index";

const mapStateToProps = (state: RootState) => ({
    product: state.product.product,
    isFetching: state.product.isFetching,
    error: state.product.error,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProduct: (productId: string) => dispatch(fetchProductById(productId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsPage);
