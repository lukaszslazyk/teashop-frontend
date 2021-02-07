import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        topProductNameTextContainer: {
            marginBottom: -theme.spacing(1),
        },
        productNameText: {
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
            },
        },
    })
);

export default useStyles;
