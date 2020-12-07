import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progressContainer: {
            display: "flex",
            justifyContent: "center",
            padding: theme.spacing(3),
        },
        backdropProgress: {
            color: "white",
        },
        cartEmptyInfo: {
            color: grey[500],
        },
    })
);

export default useStyles;
