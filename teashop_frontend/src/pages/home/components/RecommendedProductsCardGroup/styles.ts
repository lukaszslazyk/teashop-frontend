import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        productCardsContainer: {
            [theme.breakpoints.up("md")]: {
                flexBasis: "18.5%",
            },
        },
    })
);

export default useStyles;
