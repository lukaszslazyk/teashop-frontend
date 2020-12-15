import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down("xs")]: {
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
        topProductNameTextContainer: {
            marginBottom: -theme.spacing(1),
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
        flexiblePanel: {
            alignSelf: "flex-end",
            [theme.breakpoints.down("sm")]: {
                alignSelf: "center",
            },
        },
    })
);

export default useStyles;
