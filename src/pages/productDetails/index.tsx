import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import ErrorInfo from "../../common/components/ErrorInfo";
import MainLayout from "../../layout/main";
import { Product } from "../../product/models";
import ProductDetailsContentHeader from "./components/ProductDetailsContentHeader";
import ProductDetailsContentBody from "./components/ProductDetailsContentBody";
import useStyles from "./styles";

interface Props {
    product: Product | null;
    isFetching: boolean;
    error: boolean;
    loadProduct: (productId: string) => void;
}

interface Params {
    productId: string;
}

const ProductDetailsPage = (props: Props) => {
    const classes = useStyles();
    const { productId }: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);
    const [quantity, setQuantity] = React.useState(0);

    const loadProduct = props.loadProduct;
    useEffect(() => {
        loadProduct(productId);
    }, [productId, loadProduct]);

    useEffect(() => {
        setTimeoutPassed(false);
        setTimeout(() => {
            setTimeoutPassed(true);
        }, 1000);
    }, [setTimeoutPassed]);

    return (
        <MainLayout>
            {props.isFetching && timeoutPassed && (
                <div className={classes.progressContainer}>
                    <CircularProgress />
                </div>
            )}
            {!props.isFetching && props.error && (
                <ErrorInfo errorMessage="Product is currently unavailable." />
            )}
            {!props.isFetching && !props.error && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <ProductDetailsContentHeader
                            product={props.product}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ProductDetailsContentBody
                            product={props.product} 
                        />
                    </Grid>
                </Grid>
            )}
        </MainLayout>
    );
};

export default ProductDetailsPage;
