import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        totalPriceText: {
            paddingTop: theme.spacing(1),
            textAlign: "right",
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
            },
        },
        checkoutButtonContainer: {
            justifyContent: "flex-end",
            [theme.breakpoints.down("sm")]: {
                justifyContent: "center",
            },
        },
    })
);

export default useStyles;
