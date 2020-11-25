import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
            flexWrap: "nowrap",
        },
        imageContainer: {
            width: 100,
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing(1),
        },
        image: {
            width: "100%",
            paddingTop: 5,
        },
        contentContainer: {
            marginLeft: theme.spacing(1),
            flexGrow: 1,
            alignItems: "center",
            [theme.breakpoints.up("xs")]: {
                justifyContent: "flex-end"
            },
            [theme.breakpoints.down("xs")]: {
                justifyContent: "flex-start"
            }
        },
        productNameTextContainer: {
            flexGrow: 1,
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
