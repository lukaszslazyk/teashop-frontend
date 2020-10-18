import React, { useEffect } from "react";
import MainLayout from "../../layout/components/MainLayout";
import ProductCardTileGroup from "../../domain/product/components/ProductCardTileGroup";
import { Product } from "../../domain/product/types";

interface Props {
    products: Product[];
    loadProducts: () => void;
}

const BrowsePage = (props: Props) => {
    useEffect(() => {
        props.loadProducts();
    }, []); // some warn is on console, check useCallback, might help

    return (
        <MainLayout>
            <ProductCardTileGroup products={props.products} />
        </MainLayout>
    );
};

export default BrowsePage;
