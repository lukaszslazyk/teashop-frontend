import { Dispatch } from "react";
import { connect } from "react-redux";
import { fetchAllProducts } from "../../product/actions";
import { RootState } from "../../redux_setup/rootReducer";
import BrowsePage from "./index";

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
    isFetching: state.product.isFetching,
    error: state.product.error,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProducts: () => dispatch(fetchAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);