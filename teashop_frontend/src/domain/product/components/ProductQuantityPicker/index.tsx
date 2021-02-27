import React from "react";
import { Product } from "../../models";
import { pricedByWeight } from "../../services/productService";
import QuantityPicker from "../QuantityPicker";

interface Props {
    product: Product;
    onQuantityChange: (value: number, valid: boolean) => void;
    initialValue?: number;
}

const ProductQuantityPicker = (props: Props) => {
    const initialValue = props.initialValue
        ? props.initialValue
        : props.product.quantityPerPrice;

    if (pricedByWeight(props.product))
        return (
            <QuantityPicker
                initialValue={initialValue}
                lowThreshold={50}
                step={25}
                onQuantityChange={props.onQuantityChange}
                unit="g"
            />
        );
    return (
        <QuantityPicker
            initialValue={initialValue}
            lowThreshold={1}
            step={1}
            onQuantityChange={props.onQuantityChange}
        />
    );
};

export default ProductQuantityPicker;
