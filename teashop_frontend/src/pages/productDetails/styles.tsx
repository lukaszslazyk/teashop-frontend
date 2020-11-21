import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progressContainer: {
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing(3),
        },
        cardMedia: {
            height: 350,
        }
    })
);

export default useStyles;
