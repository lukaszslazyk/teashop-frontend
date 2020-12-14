import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { setShippingAddressSameAsBillingAddress } from "../../../../../../domain/order/actions";

const useLogic = () => {
    const billingAddressSameAsShippingAddress = useSelector(
        (state: RootState) =>
            state.order.orderFormData.billingAddressSameAsShippingAddress
    );
    const dispatch = useDispatch();

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setShippingAddressSameAsBillingAddress(event.target.checked));
    };

    return {
        billingAddressSameAsShippingAddress,
        handleCheckboxChange,
    };
};

export default useLogic;
