import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
        },
        imageWrapper: {
            height: "100%",
            padding: theme.spacing(2),
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            height: 300,
            width: "auto",
            display: "flex",
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
        alignToEnd: {
            alignSelf: "flex-end",
        },
    })
);

export default useStyles;
