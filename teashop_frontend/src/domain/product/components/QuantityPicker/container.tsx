import React, { ChangeEvent, useState } from "react";
import QuantityPicker from ".";

interface Props {
    inputLabel: string;
    initialValue: number;
    lowThreshold: number;
    step: number;
    onQuantityChange: (value: number, valid: boolean) => void;
    interactionDisabled?: boolean;
    onQuantityTextInputFocus?: () => void;
    onQuantityTextInputBlur?: () => void;
}

const QuantityPickerContainer = (props: Props) => {
    const [quantityText, setQuantityText] = useState(
        props.initialValue.toString()
    );
    const [quantityTextChanged, setQuantityTextChanged] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [errorInfoHidden, setErrorInfoHidden] = useState(true);

    const handleQuantityTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuantityText(value);
        setQuantityTextChanged(true);
        validateQuantityText(value);
    };

    const handleQuantityTextInputFocused = () => {
        setErrorInfoHidden(false);
        if (props.onQuantityTextInputFocus)
            props.onQuantityTextInputFocus();
    };

    const handleQuantityTextInputBlured = () => {
        setErrorInfoHidden(true);
        if (quantityTextChanged) {
            setQuantityTextChanged(false);
            processQuantityText();
        }
        if (props.onQuantityTextInputBlur)
            props.onQuantityTextInputBlur();
    };

    const handleAddClicked = () => {
        setQuantityText((Number(quantityText) + props.step).toString());
        props.onQuantityChange(Number(quantityText) + props.step, true);
    };

    const handleSubtractClicked = () => {
        setQuantityText((Number(quantityText) - props.step).toString());
        props.onQuantityChange(Number(quantityText) - props.step, true);
    };

    const hasError = (): boolean =>
        errorText !== "";

    const canAdd = (): boolean =>
        !hasError();

    const canSubtract = (): boolean =>
        !hasError() && Number(quantityText) > props.lowThreshold;

    const validateQuantityText = (input: string) => {
        if (quantityValid(input))
            handleValidQuantity();
        else
            handleInvalidQuantity();
    };

    const handleValidQuantity = () =>
        setErrorText("");

    const handleInvalidQuantity = () =>
        setErrorText("Please provide a number");

    const quantityValid = (input: string): boolean =>
        !empty(input) && representsValidNumber(input);

    const empty = (input: string): boolean => input.length === 0;

    const representsValidNumber = (input: string): boolean =>
        !isNaN(Number(input));

    const processQuantityText = () => {
        if (hasError())
            props.onQuantityChange(0, false);
        else if (Number(quantityText) < props.lowThreshold) {
            setQuantityText(props.lowThreshold.toString());
            props.onQuantityChange(props.lowThreshold, true);
        } else
            props.onQuantityChange(Number(quantityText), true);
    };

    return (
        <QuantityPicker
            inputLabel={props.inputLabel}
            quantityText={quantityText}
            errorText={errorText}
            errorInfoHidden={errorInfoHidden}
            interactionDisabled={
                props.interactionDisabled ? props.interactionDisabled : false
            }
            onQuantityTextChange={handleQuantityTextChange}
            onQuantityTextInputFocus={handleQuantityTextInputFocused}
            onQuantityTextInputBlur={handleQuantityTextInputBlured}
            onAddClicked={handleAddClicked}
            onSubtractClicked={handleSubtractClicked}
            hasError={hasError}
            canAdd={canAdd}
            canSubtract={canSubtract}
        ></QuantityPicker>
    );
};

export default QuantityPickerContainer;
