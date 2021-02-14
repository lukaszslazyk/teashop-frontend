import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        itemContainer: {
            flexWrap: "nowrap",
        },
        imageContainer: {
            display: "flex",
            alignItems: "center",
            width: 50,
            height: 50,
        },
        image: {
            width: "100%",
        },
        grow: {
            flexGrow: 1,
        },
        productNameText: {
            color: "black",
            textDecoration: "none",
            "&:hover": {
                textDecoration: "underline",
            },
        },
        quantityText: {
            marginRight: theme.spacing(2),
            whiteSpace: "nowrap",
            [theme.breakpoints.up("xs")]: {
                textAlign: "right",
            },
            [theme.breakpoints.down("xs")]: {
                textAlign: "left",
            },
        },
        priceText: {
            whiteSpace: "nowrap",
            textAlign: "right",
            marginRight: -theme.spacing(1),
        },
    })
);

export default useStyles;
