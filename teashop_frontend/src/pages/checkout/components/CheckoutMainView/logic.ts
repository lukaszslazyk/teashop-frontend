import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";

const useLogic = () => {
    const cart = useSelector((state: RootState) => state.cart.cart);
    const cartFetchedYet = useSelector(
        (state: RootState) => state.cart.cartFetchedYet
    );
    const [activeStep, setActiveStep] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (activeStep === 0 && cartFetchedYet && cart.items.length === 0)
            history.push("/cart");
    }, [activeStep, cart, cartFetchedYet, history]);

    const handleContinueButtonClicked = () => {
        setActiveStep(activeStep => activeStep + 1);
    };

    const handleBackButtonClicked = () => {
        if (activeStep === 0)
            history.push("/cart");
        else
            setActiveStep(activeStep => activeStep - 1);
    };

    return {
        activeStep,
        handleContinueButtonClicked,
        handleBackButtonClicked,
    };
};

export default useLogic;
