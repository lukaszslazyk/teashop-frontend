import { Hidden } from "@material-ui/core";
import React from "react";
import { Product } from "../../models";
import ProductCardGroup from "../ProductCardGroup";
import ProductCardGroupForMobile from "../ProductCardGroupForMobile";

interface Props {
    products?: Product[];
    isPlaceholder?: boolean;
    numberOfPlaceholderCards?: number;
}

const ResponsiveProductCardGroup = (props: Props) => (
    <div>
        <Hidden xsDown>
            <ProductCardGroup
                products={props.products}
                isPlaceholder={props.isPlaceholder}
                numberOfPlaceholderCards={props.numberOfPlaceholderCards}
            />
        </Hidden>
        <Hidden smUp>
            <ProductCardGroupForMobile
                products={props.products}
                isPlaceholder={props.isPlaceholder}
                numberOfPlaceholderCards={props.numberOfPlaceholderCards}
            />
        </Hidden>
    </div>
);

export default ResponsiveProductCardGroup;
