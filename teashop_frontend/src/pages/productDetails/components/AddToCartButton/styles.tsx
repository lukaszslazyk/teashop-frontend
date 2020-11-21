import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 187,
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
