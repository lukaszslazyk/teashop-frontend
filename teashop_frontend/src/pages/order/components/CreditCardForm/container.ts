import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    setCreditCard,
    setCreditCardFormValid,
} from "../../../../domain/order/actions";
import { CreditCard } from "../../../../domain/order/models";
import CreditCardForm from ".";

const mapStateToProps = (state: RootState) => ({
    creditCard: state.order.creditCard,
    shouldValidate: state.order.creditCardForm.shouldValidate,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setCreditCard: (value: CreditCard) => dispatch(setCreditCard(value)),
    setFormValid: (value: boolean) => dispatch(setCreditCardFormValid(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);
