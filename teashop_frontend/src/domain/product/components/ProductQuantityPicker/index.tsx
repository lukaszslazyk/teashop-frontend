import React from "react";
import QuantityPicker from "../QuantityPicker";

interface Props {
    initialValue: number,
    pricedByWeight: boolean
    quantityChangedCallback: (value: number) => void;
    quantityInvalidCallback?: () => void;
    interactionDisabled?: boolean;
}

const ProductQuantityPicker = (props: Props) => {
    if (props.pricedByWeight)
        return (
            <QuantityPicker
                inputLabel="Grams"
                initialValue={props.initialValue}
                lowThreshold={50}
                step={25}
                quantityChangedCallback={props.quantityChangedCallback}
                quantityInvalidCallback={props.quantityInvalidCallback}
                interactionDisabled={props.interactionDisabled}
            />
        );
    return (
        <QuantityPicker
            inputLabel=""
            initialValue={props.initialValue}
            lowThreshold={1}
            step={1}
            quantityChangedCallback={props.quantityChangedCallback}
            quantityInvalidCallback={props.quantityInvalidCallback}
            interactionDisabled={props.interactionDisabled}
        />
    );
};

export default ProductQuantityPicker;
