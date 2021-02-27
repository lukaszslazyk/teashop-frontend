import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
        addToCartButton: {
            width: 192,
        },
        progressIndicator: {
            color: "white",
            marginRight: theme.spacing(1),
        },
        icon: {
            marginRight: theme.spacing(1),
        },
    })
);

export default useStyles;
