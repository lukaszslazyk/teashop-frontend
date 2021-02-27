import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import { Product } from "../../models";
import { pricedByWeight } from "../../services/productService";
import useStyles from "./styles";

interface Props {
    product?: Product;
}

const getPriceTagFor = (product: Product) => {
    const priceText = getPriceTextWithCurrency(product.price);

    return pricedByWeight(product)
        ? `${priceText} / ${product.quantityPerPrice}g`
        : priceText;
};

const getLinkUrl = (product?: Product) =>
    (product
        ? routing.productDetails.getPathWithParams({
            productNumber: product.productNumber.toString(),
        })
        : "#");

const ProductCard = (props: Props) => {
    const { product } = props;
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea
                component={Link}
                to={getLinkUrl(product)}
                className={classes.cardActionArea}
            >
                <CardMedia className={classes.cardMedia}>
                    <div className={classes.equalAspectRatioTopContainer}>
                        <div className={classes.equalAspectRatioInnerContainer}>
                            {product ? (
                                <img
                                    src={getImageFullUrl(product.imagePath)}
                                    alt="Product"
                                    className={classes.image}
                                />
                            ) : (
                                <Skeleton
                                    animation="wave"
                                    variant="rect"
                                    className={classes.image}
                                    height={"100%"}
                                />
                            )}
                        </div>
                    </div>
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Grid
                        container
                        className={classes.cardContentInnerContainer}
                    >
                        <Grid item xs={12}>
                            <Typography
                                align="center"
                                gutterBottom
                                className={classes.productNameText}
                            >
                                {product ? product.name : <Skeleton />}
                            </Typography>
                            <Box mb={1}>
                                <Divider />
                            </Box>
                            <Typography align="center" variant="body2">
                                {product ? getPriceTagFor(product) : <Skeleton />}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
