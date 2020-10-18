import React from "react";
import { Product } from "../types";
import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography,
} from "@material-ui/core";
import useStyles from "../styles";

interface Props {
    product: Product;
}

const ProductCard = (props: Props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.cardMedia}
                    image="images/leaves_example.jpg"
                    title="Tea"
                />
                <CardContent>
                    <Typography align="center" gutterBottom variant="h6" component="h2">
                        {props.product.name}
                    </Typography>
                    <Box mb={1}><Divider /></Box>
                    <Typography align="center" variant="body2" component="p">
                       {props.product.pricePerReference} {props.product.currency} / {props.product.referenceValue}{props.product.unit}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
