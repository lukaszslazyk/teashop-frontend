import { ChangeEvent, useEffect, useState } from "react";

const useLogic = (
    initialValue: number,
    lowThreshold: number,
    step: number,
    onQuantityChange: (value: number, valid: boolean) => void
) => {
    const [quantityText, setQuantityText] = useState(initialValue.toString());
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
        processQuantityText(value);
    };

    const handleQuantityTextInputFocused = () => setErrorInfoHidden(false);

    const handleQuantityTextInputBlured = () => setErrorInfoHidden(true);

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

    const processQuantityText = (value: string) => {
        if (validateQuantityText(value))
            onQuantityChange(Number(value), true);
        else
            onQuantityChange(0, false);
    };

    const validateQuantityText = (input: string): boolean => {
        const errorText = getErrorTextFor(input);
        setErrorText(errorText);
        return errorText === "";
    };

    const getErrorTextFor = (input: string): string => {
        if (empty(input) || invalidNumber(input))
            return "Please provide a number";
        else if (lowerThanLowThreshold(input))
            return `Minimum value is ${lowThreshold}`;
        return "";
    };

    const empty = (input: string): boolean => input.length === 0;

    const invalidNumber = (input: string): boolean =>
        isNaN(Number(input));

    const lowerThanLowThreshold = (input: string) =>
        Number(input) < lowThreshold;

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
        canSubtract,
    };
};

export default useLogic;
