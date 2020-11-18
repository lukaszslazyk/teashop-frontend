import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            flexWrap: "nowrap",
        },
        image: {
            width: 80,
            paddingTop: 5,
        },
        contentContainer: {
            flexGrow: 1,
        },
        productNameTextContainer: {
            flexGrow: 1,
        },
        buttonsContainer: {
            flexWrap: "nowrap",
        },
        removeButton: {
            "&.MuiFab-root": {
                backgroundColor: red[600],
                "&.Mui-disabled": {
                    backgroundColor: grey[300],
                }
            },
            color: "white",
        },
    })
);

export default useStyles;
