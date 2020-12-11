import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { setPaymentCardFormData } from "../../../../../../domain/order/actions";
import { PaymentCardFormData } from "../../../../../../domain/order/models";

const useLogic = (
    onContinueButtonClick: () => void,
    onBackButtonClick: () => void
) => {
    const paymentCardFormData = useSelector(
        (state: RootState) => state.order.orderFormData.paymentCardFormData
    );
    const chosenPaymentMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenPaymentMethodName
    );
    const dispatch = useDispatch();
    const paymentCardFormMethods = useForm<PaymentCardFormData>({
        defaultValues: paymentCardFormData,
    });

    const handleContinueButtonClicked = () => {
        if (chosenPaymentMethodName === "card")
            paymentCardFormMethods.handleSubmit(onPaymentCardFormSubmit)();
    };

    const handleBackButtonClicked = () => onBackButtonClick();

    const onPaymentCardFormSubmit = () => {
        dispatch(setPaymentCardFormData(paymentCardFormMethods.getValues()));
        onContinueButtonClick();
    };

    return {
        paymentCardFormMethods,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    };
};

export default useLogic;
