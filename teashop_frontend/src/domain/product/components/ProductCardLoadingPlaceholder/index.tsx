import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    Grid,
    Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import useStyles from "./styles";

const ProductCardLoadingPlaceholder = () => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
                <Skeleton
                    animation="wave"
                    variant="rect"
                    className={classes.cardMedia}
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
                                <Skeleton />
                            </Typography>

                            <Box mb={1}>
                                <Divider />
                            </Box>
                            <Typography
                                align="center"
                                variant="body2"
                                component="p"
                            >
                                <Skeleton />
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCardLoadingPlaceholder;
