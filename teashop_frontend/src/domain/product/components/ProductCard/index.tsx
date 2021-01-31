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
import React from "react";
import { Link, useLocation } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import { Product } from "../../models";
import { pricedByWeight } from "../../services/productService";
import useBrowsePageStyles from "./browsePageStyles";
import useHomePageStyles from "./homePageStyles";

interface Props {
    product: Product;
}

const ProductCard = (props: Props) => {
    const product = props.product;
    const location = useLocation();
    const browsePageClasses = useBrowsePageStyles();
    const homePageClasses = useHomePageStyles();
    const classes =
        location.pathname === routing.home
            ? homePageClasses
            : browsePageClasses;

    const getPriceTag = () => {
        const priceText = getPriceTextWithCurrency(product.price);
        if (pricedByWeight(product))
            return `${priceText} / ${product.quantityPerPrice}g`;
        return priceText;
    };

    return (
        <Card className={classes.card}>
            <CardActionArea
                component={Link}
                to={routing.productDetails.getPathWithParams({
                    productId: product.id,
                })}
                className={classes.cardActionArea}
            >
                <CardMedia
                    className={classes.cardMedia}
                    image={getImageFullUrl(product.imagePath)}
                    title="Product"
                />
                <CardContent className={classes.cardContent}>
                    <Grid
                        container
                        className={classes.cardContentInnerContainer}
                    >
                        <Grid item xs={12}>
                            <Typography
                                align="center"
                                gutterBottom
                                variant="h6"
                                component="h2"
                            >
                                {product.name}
                            </Typography>

                            <Box mb={1}>
                                <Divider />
                            </Box>
                            <Typography
                                align="center"
                                variant="body2"
                                component="p"
                            >
                                {getPriceTag()}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
