import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexWrap: "nowrap",
        },
        removeButton: {
            color: red[600],
        },
    })
);

export default useStyles;
