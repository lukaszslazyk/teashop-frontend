import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { validateCreditCardForm } from "../../../../domain/order/actions";
import PaymentStepView from ".";

const mapStateToProps = (state: RootState) => ({
    chosenPaymentMethod: state.order.chosenPaymentMethod,
    creditCardFormWasValidated: state.order.creditCardForm.wasValidated,
    creditCardFormValid: state.order.creditCardForm.valid,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    validateCreditCardForm: () => dispatch(validateCreditCardForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepView);
