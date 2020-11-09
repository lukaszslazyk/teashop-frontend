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
import { Product } from "../../models";
import useStyles from "./styles";

const IMAGES_ROOT = process.env.REACT_APP_CDN_ROOT;

interface Props {
    product: Product;
}

const ProductCard = (props: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                {/* TODO Add default image if product's imagePath is empty */}
                <CardMedia
                    className={classes.cardMedia}
                    image={`${IMAGES_ROOT}/${props.product.imagePath}`}
                    title="Tea"
                />
                <CardContent>
                    <Typography
                        align="center"
                        gutterBottom
                        variant="h6"
                        component="h2"
                    >
                        {props.product.name}
                    </Typography>
                    <Box mb={1}>
                        <Divider />
                    </Box>
                    <Typography align="center" variant="body2" component="p">
                        {props.product.price} EUR /{" "}
                        {props.product.quantityPerPrice}g
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
