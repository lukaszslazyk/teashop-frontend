import { Theme, createStyles, makeStyles } from "@material-ui/core";

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
    })
);

export default useStyles;
