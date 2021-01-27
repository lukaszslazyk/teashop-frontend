import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(2),
        },
        descriptionText: {
            textAlign: "justify",
        },
    })
);

export default useStyles;
