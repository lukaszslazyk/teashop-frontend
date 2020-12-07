import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
        },
        grow: {
            flexGrow: 1,
        },
        dividerContainer: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
);

export default useStyles;
