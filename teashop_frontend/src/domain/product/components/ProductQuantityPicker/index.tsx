import React from "react";
import QuantityPicker from "../QuantityPicker";

interface Props {
    initialValue: number,
    pricedByWeight: boolean
    onQuantityChange: (value: number, valid: boolean) => void;
    interactionDisabled?: boolean;
    onQuantityTextInputFocus?: () => void;
    onQuantityTextInputBlur?: () => void;
}

const ProductQuantityPicker = (props: Props) => {
    if (props.pricedByWeight)
        return (
            <QuantityPicker
                inputLabel="Grams"
                initialValue={props.initialValue}
                lowThreshold={50}
                step={25}
                onQuantityChange={props.onQuantityChange}
                onQuantityTextInputFocus={props.onQuantityTextInputFocus}
                onQuantityTextInputBlur={props.onQuantityTextInputBlur}
                interactionDisabled={props.interactionDisabled}
            />
        );
    return (
        <QuantityPicker
            inputLabel=""
            initialValue={props.initialValue}
            lowThreshold={1}
            step={1}
            onQuantityChange={props.onQuantityChange}
            onQuantityTextInputFocus={props.onQuantityTextInputFocus}
            onQuantityTextInputBlur={props.onQuantityTextInputBlur}
            interactionDisabled={props.interactionDisabled}
        />
    );
};

export default ProductQuantityPicker;
