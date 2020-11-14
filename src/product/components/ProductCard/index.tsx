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
import { Product } from "../../models";
import useStyles from "./styles";

const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

interface Props {
    product: Product;
}

const ProductCard = (props: Props) => {
    const product = props.product;
    const classes = useStyles();

    const getPriceTag = () => {
        if (productPricedByWeight())
            return `${product.price} EUR / ${product.quantityPerPrice}g`;
        else
            return `${product.price} EUR`;
    };

    const productPricedByWeight = (): boolean => {
        return product.quantityPerPrice > 1;
    };

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
                {/* TODO Add default image if product's imagePath is empty */}
                <CardMedia
                    className={classes.cardMedia}
                    image={`${IMAGES_ROOT}/${product.imagePath}`}
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
