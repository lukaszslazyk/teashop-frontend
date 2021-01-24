import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: grey[500]
        },
        titleText: {
            marginBottom: theme.spacing(1),
        }
    })
);

export default useStyles;
