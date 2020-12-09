import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import { Product } from "../../models";
import { pricedByWeight } from "../../services/productService";
import useStyles from "./styles";

interface Props {
    product: Product;
}

const ProductCard = (props: Props) => {
    const product = props.product;
    const classes = useStyles();

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
            >
                <CardMedia
                    className={classes.cardMedia}
                    image={getImageFullUrl(product.imagePath)}
                    title="Product"
                />
                <CardContent>
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
                    <Typography align="center" variant="body2" component="p">
                        {getPriceTag()}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
