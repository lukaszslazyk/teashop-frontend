import React from "react";
import { Product } from "../../models";
import { pricedByWeight } from "../../services/productService";
import QuantityPicker from "../QuantityPicker";

interface Props {
    product: Product;
    onQuantityChange: (value: number, valid: boolean) => void;
    interactionDisabled?: boolean;
}

const ProductQuantityPicker = (props: Props) => {
    if (pricedByWeight(props.product))
        return (
            <QuantityPicker
                inputLabel="Grams"
                initialValue={props.product.quantityPerPrice}
                lowThreshold={50}
                step={25}
                onQuantityChange={props.onQuantityChange}
                interactionDisabled={props.interactionDisabled}
            />
        );
    return (
        <QuantityPicker
            inputLabel=""
            initialValue={1}
            lowThreshold={1}
            step={1}
            onQuantityChange={props.onQuantityChange}
            interactionDisabled={props.interactionDisabled}
        />
    );
};

export default ProductQuantityPicker;
