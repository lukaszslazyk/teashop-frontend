import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { setChosenShippingMethod, setShippingFee } from "../../../../../../domain/order/actions";

const useLogic = () => {
    const shippingMethods = useSelector(
        (state: RootState) => state.order.orderMeta.shippingMethods
    );
    const chosenShippingMethodName = useSelector(
        (state: RootState) => state.order.orderFormData.chosenShippingMethodName
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const shippingMethod = shippingMethods.find(
            method => method.name === chosenShippingMethodName
        );
        if (shippingMethod)
            dispatch(setShippingFee(shippingMethod.fee));
    }, [chosenShippingMethodName, shippingMethods, dispatch]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(setChosenShippingMethod(event.target.value));

    return {
        shippingMethods,
        chosenShippingMethodName,
        handleChange,
    };
};

export default useLogic;
