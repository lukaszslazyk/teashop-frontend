import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backButtonIcon: {
            fontSize: theme.typography.button.fontSize,
            marginRight: theme.spacing(1),
        },
        forwardButtonIcon: {
            fontSize: theme.typography.button.fontSize,
            marginLeft: theme.spacing(1),
        },
    })
);

export default useStyles;
