import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { setCreditCard } from "../../../../domain/order/actions";
import { CreditCard } from "../../../../domain/order/models";
import PaymentStepView from ".";

const mapStateToProps = (state: RootState) => ({
    creditCard: state.order.creditCard,
    chosenPaymentMethod: state.order.chosenPaymentMethod,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setCreditCard: (value: CreditCard) => dispatch(setCreditCard(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepView);
