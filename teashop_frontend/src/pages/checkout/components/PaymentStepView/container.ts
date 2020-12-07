import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { setPaymentCardFormData } from "../../../../domain/order/actions";
import { PaymentCardFormData } from "../../../../domain/order/models";
import PaymentStepView from ".";

const mapStateToProps = (state: RootState) => ({
    paymentCardFormData: state.order.orderFormData.paymentCardFormData,
    chosenPaymentMethodName: state.order.orderFormData.chosenPaymentMethodName,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setPaymentCardFormData: (value: PaymentCardFormData) =>
        dispatch(setPaymentCardFormData(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentStepView);
