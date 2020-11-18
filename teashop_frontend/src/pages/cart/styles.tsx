import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdropProgressContainer: {
            zIndex: theme.zIndex.tooltip + 1,
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
