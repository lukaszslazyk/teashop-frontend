import { ChangeEvent, useEffect, useState } from "react";

const useLogic = (
    initialValue: number,
    lowThreshold: number,
    step: number,
    onQuantityChange: (value: number, valid: boolean) => void,
    onQuantityTextInputFocus?: () => void,
    onQuantityTextInputBlur?: () => void
) => {
    const [quantityText, setQuantityText] = useState(initialValue.toString());
    const [quantityTextChanged, setQuantityTextChanged] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [errorInfoHidden, setErrorInfoHidden] = useState(true);
    const [errorInfoOpen, setErrorInfoOpen] = useState(false);
    const [displayedErrorText, setDisplayedErrorText] = useState("");
    
    useEffect(() => {
        if (errorText !== "" && !errorInfoHidden) {
            setDisplayedErrorText(errorText);
            setErrorInfoOpen(true);
        } else
            setErrorInfoOpen(false);
    }, [errorText, errorInfoHidden]);

    const handleQuantityTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuantityText(value);
        setQuantityTextChanged(true);
        validateQuantityText(value);
    };

    const handleQuantityTextInputFocused = () => {
        setErrorInfoHidden(false);
        if (onQuantityTextInputFocus)
            onQuantityTextInputFocus();
    };

    const handleQuantityTextInputBlured = () => {
        setErrorInfoHidden(true);
        if (quantityTextChanged) {
            setQuantityTextChanged(false);
            processQuantityText();
        }
        if (onQuantityTextInputBlur)
            onQuantityTextInputBlur();
    };

    const handleAddClicked = () => {
        setQuantityText((Number(quantityText) + step).toString());
        onQuantityChange(Number(quantityText) + step, true);
    };

    const handleSubtractClicked = () => {
        setQuantityText((Number(quantityText) - step).toString());
        onQuantityChange(Number(quantityText) - step, true);
    };

    const hasError = (): boolean => errorText !== "";

    const canAdd = (): boolean => !hasError();

    const canSubtract = (): boolean =>
        !hasError() && Number(quantityText) > lowThreshold;

    const validateQuantityText = (input: string) => {
        if (quantityValid(input))
            handleValidQuantity();
        else
            handleInvalidQuantity();
    };

    const handleValidQuantity = () => setErrorText("");

    const handleInvalidQuantity = () => setErrorText("Please provide a number");

    const quantityValid = (input: string): boolean =>
        !empty(input) && representsValidNumber(input);

    const empty = (input: string): boolean => input.length === 0;

    const representsValidNumber = (input: string): boolean =>
        !isNaN(Number(input));

    const processQuantityText = () => {
        if (hasError())
            onQuantityChange(0, false);
        else if (Number(quantityText) < lowThreshold) {
            setQuantityText(lowThreshold.toString());
            onQuantityChange(lowThreshold, true);
        } else
            onQuantityChange(Number(quantityText), true);
    };

    return {
        quantityText,
        displayedErrorText,
        errorInfoOpen,
        handleQuantityTextChange,
        handleQuantityTextInputFocused,
        handleQuantityTextInputBlured,
        handleAddClicked,
        handleSubtractClicked,
        hasError,
        canAdd,
        canSubtract
    };
};

export default useLogic;
