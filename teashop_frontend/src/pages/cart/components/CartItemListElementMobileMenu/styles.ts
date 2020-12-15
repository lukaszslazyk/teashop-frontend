import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        openMenuButton: {
            marginRight: -theme.spacing(3),
        },
        menuIcon: {
            marginRight: theme.spacing(2),
        },
        removeIcon: {
            color: red[600],
        },
    })
);

export default useStyles;
