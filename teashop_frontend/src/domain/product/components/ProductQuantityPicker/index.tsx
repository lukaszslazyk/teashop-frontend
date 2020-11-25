import React from "react";
import QuantityPickerContainer from "../QuantityPicker/container";

interface Props {
    initialValue: number,
    pricedByWeight: boolean
    quantityChangedCallback: (value: number) => void;
    quantityInvalidCallback?: () => void;
    quantityValidCallback?: () => void;
    interactionDisabled?: boolean;
}

const ProductQuantityPicker = (props: Props) => {
    if (props.pricedByWeight)
        return (
            <QuantityPickerContainer
                inputLabel="Grams"
                initialValue={props.initialValue}
                lowThreshold={50}
                step={25}
                quantityChangedCallback={props.quantityChangedCallback}
                quantityInvalidCallback={props.quantityInvalidCallback}
                quantityValidCallback={props.quantityValidCallback}
                interactionDisabled={props.interactionDisabled}
            />
        );
    return (
        <QuantityPickerContainer
            inputLabel=""
            initialValue={props.initialValue}
            lowThreshold={1}
            step={1}
            quantityChangedCallback={props.quantityChangedCallback}
            quantityInvalidCallback={props.quantityInvalidCallback}
            quantityValidCallback={props.quantityValidCallback}
            interactionDisabled={props.interactionDisabled}
        />
    );
};

export default ProductQuantityPicker;
