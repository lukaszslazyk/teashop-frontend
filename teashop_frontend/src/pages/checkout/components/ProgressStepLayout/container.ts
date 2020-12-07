import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import ProgressStepLayout from ".";

const mapStateToProps = (state: RootState) => ({
    totalPrice: state.order.totalPrice,
});

export default connect(mapStateToProps)(ProgressStepLayout);
