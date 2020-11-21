import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cardMedia: {
            height: 350,
        },
        productNameText: {
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
            },
        },
        priceText: {
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
            },
        },
        productQuantityPickerContainer: {
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
        },
        addToCartButtonContainer: {
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
        },
    })
);

export default useStyles;
