import React from "react";
import QuantityPicker from "../QuantityPicker";

interface Props {
    initialValue: number,
    pricedByWeight: boolean
    quantityChangedCallback: (value: number) => void;
    interactionDisabled?: boolean;
}

const ProductQuantityPicker = (props: Props) => (
    <div>
        {props.pricedByWeight ? (
            <QuantityPicker
                inputLabel="Grams"
                initialValue={props.initialValue}
                lowThreshold={50}
                step={25}
                quantityChangedCallback={props.quantityChangedCallback}
                interactionDisabled={props.interactionDisabled}
            />
        ) : (
            <QuantityPicker
                inputLabel=""
                initialValue={props.initialValue}
                lowThreshold={0}
                step={1}
                quantityChangedCallback={props.quantityChangedCallback}
                interactionDisabled={props.interactionDisabled}
            />
        )}
    </div>
)

export default ProductQuantityPicker;
