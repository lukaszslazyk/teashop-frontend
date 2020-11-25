import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
    })
);

export default useStyles;
