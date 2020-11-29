import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { setChosenPaymentMethod } from "../../../../domain/order/actions";
import PaymentMethodForm from ".";

const mapStateToProps = (state: RootState) => ({
    paymentMethods: state.order.paymentMethods,
    chosenPaymentMethod: state.order.chosenPaymentMethod,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setChosenPaymentMethod: (paymentMethodName: string) =>
        dispatch(setChosenPaymentMethod(paymentMethodName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethodForm);
