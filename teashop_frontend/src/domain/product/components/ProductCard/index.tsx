import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
    useTheme,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useHistory } from "react-router-dom";
import routing from "../../../../configuration/routing";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import { getPriceTextWithCurrency } from "../../../../shared/services/priceService";
import { Product } from "../../models";
import { pricedByWeight } from "../../services/productService";
import useStyles from "./styles";

interface Props {
    product?: Product;
}

const ProductCard = (props: Props) => {
    const { product } = props;
    const history = useHistory();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
    const classes = useStyles();

    const getPriceTag = () => {
        if (product) {
            const priceText = getPriceTextWithCurrency(product.price);
            if (pricedByWeight(product))
                return `${priceText} / ${product.quantityPerPrice}g`;
            return priceText;
        }
        return "";
    };

    const handleClicked = () => {
        if (product)
            history.push(
                routing.productDetails.getPathWithParams({
                    productId: product.id,
                })
            );
    };

    return (
        <Card className={classes.card}>
            <CardActionArea
                onClick={handleClicked}
                className={classes.cardActionArea}
            >
                <CardMedia className={classes.cardMedia}>
                    <div className={classes.equalAspectRatioContainer}>
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
                                variant={isXsScreen ? "body1" : "h6"}
                                component="h2"
                            >
                                {product ? product.name : <Skeleton />}
                            </Typography>

                            <Box mb={1}>
                                <Divider />
                            </Box>
                            <Typography
                                align="center"
                                variant="body2"
                                component="p"
                            >
                                {product ? getPriceTag() : <Skeleton />}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;
