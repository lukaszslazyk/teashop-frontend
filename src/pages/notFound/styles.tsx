import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        notFoundInfo: {
            color: grey[500],
        },
    })
);

export default useStyles;
