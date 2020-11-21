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
import { getImageFullUrl } from "../../../../shared/services/imageService";

interface Props {
    product: Product;
}

const ProductCard = (props: Props) => {
    const product = props.product;
    const classes = useStyles();

    const getPriceTag = () => {
        if (productPricedByWeight())
            return `${product.price} EUR / ${product.quantityPerPrice}g`;

        return `${product.price} EUR`;
    };

    const productPricedByWeight = (): boolean =>
        product.quantityPerPrice > 1;

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/product/${product.id}`}>
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
