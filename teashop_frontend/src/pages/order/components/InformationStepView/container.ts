import { Dispatch } from "react";
import { connect } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import {
    validateContactInfoForm,
    validateShippingAddressForm,
} from "../../../../domain/order/actions";
import InformationStepView from ".";

const mapStateToProps = (state: RootState) => ({
    contactInfoFormWasValidated: state.order.contactInfoForm.wasValidated,
    contactInfoFormValid: state.order.contactInfoForm.valid,
    shippingAddressFormWasValidated:
        state.order.shippingAddressForm.wasValidated,
    shippingAddressFormValid: state.order.shippingAddressForm.valid,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    validateContactInfoForm: () => dispatch(validateContactInfoForm()),
    validateShippingAddressForm: () => dispatch(validateShippingAddressForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(InformationStepView);
