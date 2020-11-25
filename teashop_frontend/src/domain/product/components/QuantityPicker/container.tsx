import React, { ChangeEvent, useState } from "react";
import QuantityPicker from ".";

interface Props {
    inputLabel: string;
    initialValue: number;
    lowThreshold: number;
    step: number;
    quantityChangedCallback: (value: number) => void;
    quantityInvalidCallback?: () => void;
    quantityValidCallback?: () => void;
    interactionDisabled?: boolean;
}

const QuantityPickerContainer = (props: Props) => {
    const [quantityText, setQuantityText] = useState(
        props.initialValue.toString()
    );
    const [quantityTextChanged, setQuantityTextChanged] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [errorPopperHidden, setErrorPopperHidden] = useState(true);

    const handleQuantityTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuantityText(value);
        setQuantityTextChanged(true);
        validateQuantityText(value);
    };

    const handleQuantityTextFieldClick = () => {
        setErrorPopperHidden(false);
    };

    const handleQuantityTextFieldClickAway = () => {
        setErrorPopperHidden(true);
        if (quantityTextChanged) {
            setQuantityTextChanged(false);
            if (!hasError())
                processQuantityText();
        }
    };

    const handleAddClicked = () => {
        setQuantityText((Number(quantityText) + props.step).toString());
        props.quantityChangedCallback(Number(quantityText) + props.step);
    };

    const handleSubtractClicked = () => {
        setQuantityText((Number(quantityText) - props.step).toString());
        props.quantityChangedCallback(Number(quantityText) - props.step);
    };

    const hasError = (): boolean =>
        errorText !== "";

    const canAdd = (): boolean =>
        errorText === "";

    const canSubtract = (): boolean =>
        errorText === "" && Number(quantityText) > props.lowThreshold;

    const validateQuantityText = (input: string) => {
        if (quantityValid(input))
            handleValidQuantity();
        else
            handleInvalidQuantity();
    };

    const handleValidQuantity = () => {
        if (props.quantityValidCallback && errorText !== "")
            props.quantityValidCallback();
        setErrorText("");
    };

    const handleInvalidQuantity = () => {
        if (props.quantityInvalidCallback && errorText === "")
            props.quantityInvalidCallback();
        setErrorText("Please provide a number");
    };

    const quantityValid = (input: string): boolean =>
        !empty(input) && representsValidNumber(input);

    const empty = (input: string): boolean => input.length === 0;

    const representsValidNumber = (input: string): boolean =>
        !isNaN(Number(input));

    const processQuantityText = () => {
        if (Number(quantityText) < props.lowThreshold) {
            setQuantityText(props.lowThreshold.toString());
            props.quantityChangedCallback(props.lowThreshold);
        } else
            props.quantityChangedCallback(Number(quantityText));
    };

    return (
        <QuantityPicker
            inputLabel={props.inputLabel}
            quantityText={quantityText}
            errorText={errorText}
            errorPopperHidden={errorPopperHidden}
            interactionDisabled={
                props.interactionDisabled ? props.interactionDisabled : false
            }
            handleQuantityTextChange={handleQuantityTextChange}
            handleQuantityTextFieldClick={handleQuantityTextFieldClick}
            handleQuantityTextFieldClickAway={handleQuantityTextFieldClickAway}
            handleAddClicked={handleAddClicked}
            handleSubtractClicked={handleSubtractClicked}
            hasError={hasError}
            canAdd={canAdd}
            canSubtract={canSubtract}
        ></QuantityPicker>
    );
};

export default QuantityPickerContainer;
