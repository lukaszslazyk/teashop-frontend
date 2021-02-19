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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            display: "flex",
            width: "auto",
            height: 300,
            [theme.breakpoints.down("xs")]: {
                height: 275,
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
