import { Dispatch } from "react";
import { connect } from "react-redux";
import { fetchAllProducts, fetchProductsInCategory } from "../../product/actions";
import { RootState } from "../../redux_setup/rootReducer";
import BrowsePage from "./index";

const mapStateToProps = (state: RootState) => ({
    products: state.product.products,
    isFetching: state.product.isFetching,
    errorOccurred: state.product.errorOccurred,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loadProducts: () => dispatch(fetchAllProducts()),
    loadProductsInCategory: (categoryName: string) =>
        dispatch(fetchProductsInCategory(categoryName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowsePage);
