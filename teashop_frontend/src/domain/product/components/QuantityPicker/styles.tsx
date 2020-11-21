import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: "center",
        },
        quantityInput: {
            width: 75,
            "& input": {
                textAlign: "center",
            },
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
        },
        errorText: {
            color: theme.palette.error.dark,
        },
    })
);

export default useStyles;
