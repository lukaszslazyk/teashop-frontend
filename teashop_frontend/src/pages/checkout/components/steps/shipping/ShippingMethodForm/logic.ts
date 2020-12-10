import { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";
import { setChosenShippingMethod, setShippingPrice } from "../../../../../../domain/order/actions";
import { ShippingMethod } from "../../../../../../domain/order/models";

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
            dispatch(setShippingPrice(shippingMethod.price));
    }, [chosenShippingMethodName, shippingMethods, dispatch]);

    const findShippingMethodWithName = (
        name: string
    ): ShippingMethod | undefined =>
        shippingMethods.find(method => method.name === name);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setChosenShippingMethod(event.target.value));
    };

    return {
        chosenShippingMethodName,
        handleChange,
        findShippingMethodWithName
    };
};

export default useLogic;
