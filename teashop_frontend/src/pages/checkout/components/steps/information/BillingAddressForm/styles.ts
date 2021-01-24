import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        surface: {
            padding: theme.spacing(2),
        },
        hidden: {
            display: "none",
        },
    })
);

export default useStyles;
