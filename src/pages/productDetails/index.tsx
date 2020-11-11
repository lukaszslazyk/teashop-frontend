import { Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import MainLayout from "../../layout/main";
import { Product } from "../../product/models";
import useStyles from "./styles";

interface Props {
    product: Product | null;
    isFetching: boolean;
    error: boolean;
    loadProduct: (productId: string) => void;
}

interface Params {
    id: string;
}

const ProductDetailsPage = (props: Props) => {
    const classes = useStyles();
    const params: Params = useParams();
    const [timeoutPassed, setTimeoutPassed] = React.useState(false);

    const loadProduct = props.loadProduct;
    useEffect(() => {
        loadProduct(params.id);
    }, [loadProduct]);

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
                <Grid container justify="center">
                    <Grid item className={classes.emptyProductsInfo}>
                        <Typography variant="h3">
                            Sorry
                        </Typography>
                        <Typography variant="h6">
                            Product is currently unavailable.
                        </Typography>
                    </Grid>
                </Grid>
            )}
            {!props.isFetching && !props.error && (
                <div>
                    TODO
                </div>
            )}
        </MainLayout>
    );
};

export default ProductDetailsPage;
