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
                        {props.product.referencePrice} EUR /{" "}
                        {props.product.referenceGrams}g
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
