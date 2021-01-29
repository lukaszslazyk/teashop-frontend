import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { setChosenPaymentMethod, setPaymentFee } from "../../../../../../domain/order/actions";

const useLogic = () => {
    const paymentMethods = useSelector(
        (state: RootState) => state.order.orderMeta.paymentMethods
    );
    const chosenPaymentMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenPaymentMethodName
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const paymentMethod = paymentMethods.find(
            method => method.name === chosenPaymentMethodName
        );
        if (paymentMethod)
            dispatch(setPaymentFee(paymentMethod.fee));
    }, [chosenPaymentMethodName, paymentMethods, dispatch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setChosenPaymentMethod(event.target.value));

    return {
        paymentMethods,
        chosenPaymentMethodName,
        handleChange,
    };
};

export default useLogic;
