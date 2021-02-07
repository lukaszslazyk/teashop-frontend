import { Grid, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

interface Props {
    productName: string;
    top?: boolean;
}

const ProductDetailsContentHeaderProductNameView = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));

    const getProductNameTypographyVariant = () => {
        if (!isXsScreen && props.productName.length <= 25)
            return "h3";
        return "h4";
    };

    return (
        <Grid
            item
            xs={12}
            className={props.top ? classes.topProductNameTextContainer : ""}
        >
            <Typography
                variant={getProductNameTypographyVariant()}
                color="primary"
                className={classes.productNameText}
            >
                {props.productName}
            </Typography>
        </Grid>
    );
};

export default ProductDetailsContentHeaderProductNameView;
