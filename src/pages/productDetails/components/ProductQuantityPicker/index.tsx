import React from "react";
import QuantityPicker from "../QuantityPicker";

interface Props {
    initialValue: number,
    pricedByWeight: boolean
    setQuantityCallback: (value: number) => void;
}

const ProductQuantityPicker = (props: Props) => (
    <div>
        {props.pricedByWeight ? (
            <QuantityPicker
                inputLabel="Grams"
                initialValue={props.initialValue}
                lowThreshold={50}
                step={25}
                setQuantityCallback={props.setQuantityCallback}
            />
        ) : (
            <QuantityPicker
                inputLabel=""
                initialValue={props.initialValue}
                lowThreshold={0}
                step={1}
                setQuantityCallback={props.setQuantityCallback}
            />
        )}
    </div>
)

export default ProductQuantityPicker;
