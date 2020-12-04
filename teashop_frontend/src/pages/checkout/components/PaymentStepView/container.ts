import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { setPaymentCard } from "../../../../domain/order/actions";
import { PaymentCard } from "../../../../domain/order/models";
import PaymentStepView from ".";

const mapStateToProps = (state: RootState) => ({
    paymentCard: state.order.createdOrder.paymentCard,
    chosenPaymentMethod: state.order.createdOrder.chosenPaymentMethod,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setPaymentCard: (value: PaymentCard) => dispatch(setPaymentCard(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepView);
