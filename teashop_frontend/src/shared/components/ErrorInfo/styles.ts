import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(1),
        },
        titleText: {
            marginBottom: theme.spacing(1),
        },
        backToHomeButton: {
            marginTop: theme.spacing(2),
        },
    })
);

export default useStyles;
