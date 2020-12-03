import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        acceptedCardsHelpIcon: {
            color: grey[500],
        }
    })
);

export default useStyles;
